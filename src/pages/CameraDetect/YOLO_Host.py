from fastapi import FastAPI
from pydantic import BaseModel
from io import BytesIO
from PIL import Image
import numpy as np
import cv2, os, requests, base64, zipfile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import json, copy
from ultralytics import YOLO

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to download and extract the TFLite model if not found
def download_and_extract_tflite_model(url, save_dir, tflite_file_name):
    """
    Download and extract the TFLite model if it doesn't exist.
    """
    if not os.path.exists(os.path.join(save_dir, tflite_file_name)):
        print(f"Downloading TFLite model from {url}...")
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise error if download fails
        zip_path = os.path.join(save_dir, "model.zip")

        # Save the zip file
        with open(zip_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Model downloaded to {zip_path}.")

        # Extract the zip file
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(save_dir)
        print(f"Model extracted to {save_dir}.")

        # Remove the zip file
        os.remove(zip_path)
    else:
        print(f"TFLite model already exists at {os.path.join(save_dir, tflite_file_name)}.")

# Paths and Model Details
model_url = "https://storage.googleapis.com/download.tensorflow.org/models/tflite/coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip"
model_dir = "./model"
tflite_file_name = "detect.tflite"

# Ensure the model is downloaded and extracted
os.makedirs(model_dir, exist_ok=True)
download_and_extract_tflite_model(model_url, model_dir, tflite_file_name)

print(os.getcwd())
# Initialize YOLO classification
yolo_model = YOLO(f'{os.getcwd()}\\cancer-detect\\src\\\\pages\\CameraDetect\\ModelResults\\weights\\best.pt')

# Load TFLite Model
def load_tflite_model(model_path):
    """
    Load the TensorFlow Lite model.
    """
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

# Initialize TensorFlow Lite Model
model_path = os.path.join(model_dir, tflite_file_name)
interpreter = load_tflite_model(model_path)

# Get model input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Resize input images to match the model's input size
def preprocess_image(img_array, target_size):
    """
    Resize the image to the target size expected by the model.
    """
    resized_image = cv2.resize(img_array, target_size, interpolation=cv2.INTER_AREA)
    input_image = np.expand_dims(resized_image, axis=0)  # Add batch dimension
    input_image = input_image.astype(np.uint8)  # TFLite models often expect uint8
    return input_image, resized_image

# Postprocess the outputs to draw bounding boxes
def postprocess_and_draw_bboxes(interpreter, original_image, resized_image, input_size):
    """
    Postprocess the model output and draw the bounding box with the highest confidence on the original image.
    """
    # Run inference
    interpreter.invoke()
    boxes = interpreter.get_tensor(output_details[0]['index'])[0]  # Bounding box coordinates
    classes = interpreter.get_tensor(output_details[1]['index'])[0]  # Class IDs
    scores = interpreter.get_tensor(output_details[2]['index'])[0]  # Confidence scores

    height, width, _ = original_image.shape

    # Find the index of the detection with the highest confidence score
    max_score_index = np.argmax(scores)

    # Only process the detection with the highest confidence score
    if scores[max_score_index] > 0.5:  # Confidence threshold
        ymin, xmin, ymax, xmax = boxes[max_score_index]
        (x1, y1) = (int(xmin * width), int(ymin * height))
        (x2, y2) = (int(xmax * width), int(ymax * height))
        label = f"Class {int(classes[max_score_index])} ({scores[max_score_index]:.2f})"
        cv2.rectangle(original_image, (x1, y1), (x2, y2), (255, 0, 0), 2)  # Draw bounding box

    return original_image


# Define the Pydantic model for image input
class ImageRequest(BaseModel):
    image: str

# Define the FastAPI route
@app.post("/process_image")
async def process_image(req: ImageRequest):
    # Decode the base64 image
    image_data = base64.b64decode(req.image)
    image = Image.open(BytesIO(image_data))
    img_array = np.array(image)
    img_array_copy = copy.deepcopy(img_array)

    # Preprocess the image
    input_size = (input_details[0]['shape'][1], input_details[0]['shape'][2])  # Model input size
    input_image, resized_image = preprocess_image(img_array, target_size=input_size)

    # Set input tensor
    interpreter.set_tensor(input_details[0]['index'], input_image)

    # Postprocess and draw bounding boxes
    processed_img = postprocess_and_draw_bboxes(interpreter, img_array, resized_image, input_size)

    # Encode the processed image as base64
    _, img_encoded = cv2.imencode('.jpg', cv2.cvtColor(processed_img, cv2.COLOR_RGB2BGR))
    img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')

    # Run the classifier
    result = (yolo_model(img_array_copy))[0]
    
    print(result.names)
    print(result.probs)
    cancer_type = result.names[result.probs.top1]
    img_base64 = f'{cancer_type}>{img_base64}'
    return json.dumps({"processed_img": img_base64})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3500)
