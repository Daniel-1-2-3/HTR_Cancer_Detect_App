import { useState, useRef } from "react";
import Webcam from "react-webcam";
import Navbar from "../Navbar.jsx";

const CameraDetect = () => {
  const [frame, setFrame] = useState(null); // For processed frame
  const [captured, setCaptured] = useState(false); // To track if an image is captured
  const [cancerType, setCancerType] = useState('none');
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup
  const webcamRef = useRef(null);

  const timelines = {
    none: [
      "Maintain healthy skin care habits to prevent future skin issues.",
      "Regular check-ups with a dermatologist are recommended every 1-2 years.",
      "Protect your skin by using sunscreen and avoiding excessive sun exposure."
    ],
    akiec: [
      "Step 1: Diagnosis - Biopsy to confirm Actinic Keratoses or Bowen's Disease.",
      "Step 2: Initial Treatment - Cryotherapy, topical creams (e.g., 5-FU), or photodynamic therapy.",
      "Step 3: Follow-Up - Monitor for progression to squamous cell carcinoma every 3-6 months.",
      "Step 4: Advanced Treatment - Surgical removal or targeted therapy for advanced lesions."
    ],
    bcc: [
      "Step 1: Diagnosis - Dermatologist evaluation and biopsy to confirm basal cell carcinoma.",
      "Step 2: Initial Treatment - Surgical excision, Mohs surgery, or radiation therapy.",
      "Step 3: Preventive Measures - Sun protection and regular skin checks to prevent recurrence.",
      "Step 4: Advanced Treatment - Hedgehog pathway inhibitors for metastatic or recurrent cases."
    ],
    bkl: [
      "Step 1: Diagnosis - Clinical examination to confirm benign keratosis-like lesion.",
      "Step 2: Treatment - Usually no treatment is required; optional removal for cosmetic reasons.",
      "Step 3: Monitoring - Observe for any changes in size, shape, or color.",
      "Step 4: Prevention - Protect skin from excessive sun exposure to minimize new lesions."
    ],
    df: [
      "Step 1: Diagnosis - Clinical or dermoscopic examination to confirm dermatofibroma.",
      "Step 2: Optional Treatment - Lesion removal if painful or for cosmetic purposes.",
      "Step 3: Monitoring - Regularly check for any unusual changes or growth.",
      "Step 4: Prevention - Maintain healthy skin and avoid trauma to prevent recurrence."
    ],
    mel: [
      "Step 1: Diagnosis - Biopsy and staging of melanoma to assess severity.",
      "Step 2: Initial Treatment - Wide surgical excision to remove the lesion.",
      "Step 3: Advanced Treatment - Immunotherapy, targeted therapy, or chemotherapy for metastatic cases.",
      "Step 4: Follow-Up - Regular follow-ups every 3-6 months for the first few years."
    ],
    nv: [
      "Step 1: Diagnosis - Dermoscopic examination to confirm melanocytic nevus.",
      "Step 2: Monitoring - Observe for changes using the ABCDE criteria (Asymmetry, Border, Color, Diameter, Evolving).",
      "Step 3: Optional Removal - Surgical removal if the nevus shows signs of atypia or for cosmetic reasons.",
      "Step 4: Prevention - Protect skin from UV exposure to reduce risks of malignant transformation."
    ],
    vasc: [
      "Step 1: Diagnosis - Clinical evaluation or imaging to confirm vascular lesion type.",
      "Step 2: Optional Treatment - Laser therapy or sclerotherapy for cosmetic or functional improvement.",
      "Step 3: Monitoring - Ensure no complications like bleeding or infection.",
      "Step 4: Prevention - Avoid trauma and practice general skin care to minimize lesion development."
    ]
  };
  
  const cancersDict = {
    none: "None",
    akiec: "Bowen's Disease",
    bcc: "Basal Cell Carcinoma",
    bkl: "Benign Keratosis-like Lesion",
    df: "Dermatofibroma",
    mel: "Melanoma",
    nv: "Melanocytic Nevus (Mole)",
    vasc: "Vascular Lesion"
  }

  const descriptions = {
    none: "No diseases detected: You are healthy!",
    akiec: "Actinic Keratoses and Intraepithelial Carcinoma (Bowen's Disease): A precancerous skin lesion caused by sun damage, potentially leading to squamous cell carcinoma if untreated.",
    bcc: "Basal Cell Carcinoma: The most common type of skin cancer, arising from the basal cells of the epidermis, typically due to sun exposure. It rarely metastasizes but can cause significant local damage.",
    bkl: "Benign Keratosis-like Lesions: Non-cancerous skin growths that include seborrheic keratoses, solar lentigines, and lichen-planus-like keratoses, often appearing as rough or scaly patches.",
    df: "Dermatofibroma: A benign skin growth often caused by minor injuries, insect bites, or other skin trauma, usually firm and reddish-brown in appearance.",
    mel: "Melanoma: A serious and aggressive form of skin cancer originating in melanocytes (pigment-producing cells). Early detection is crucial for effective treatment.",
    nv: "Melanocytic Nevus (Mole): A benign proliferation of melanocytes, which can be congenital or acquired. While most are harmless, changes in size, shape, or color may warrant medical evaluation.",
    vasc: "Vascular Lesions: Abnormalities in blood vessels, including angiomas, hemangiomas, and pyogenic granulomas, which are typically benign but can sometimes require treatment for cosmetic or medical reasons."
  };

  const captureImage = async () => {
    if (webcamRef.current) {
      const currentFrame = webcamRef.current.getScreenshot();
      const editedFrame = await editFrame(currentFrame);
      setFrame(editedFrame);
      setCaptured(true); // Switch to the captured image view
    }
  };

  const editFrame = async (frame) => {
    if (frame == null) {
      return;
    }
    const base64String = frame.split(",")[1]; // Remove data URL prefix
    const response = await fetch("http://localhost:3500/process_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64String }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    data = data.substring(0, data.length - 1).slice(data.indexOf(':') + 1);

    const cancerType = data.substring(2, data.indexOf('>'))
    setCancerType(cancerType)

    data = data.replace(`${cancerType}>`, "")
    let processedImage = "data:image/jpeg;base64," + data;

    setShowPopup(true)
    return processedImage.replace(/"/g, "");
  };

  const videoConstraints = {
    width: 1920, // Increased width for a larger feed
    height: 1080, // Increased height for a larger feed
    facingMode: "user",
  };

  return (
    <main className="relative min-h-screen w-screen">
    <Navbar color={"bg-black"} text={"text-white"}/>
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white relative">
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-800 text-white rounded-xl p-6 shadow-xl text-center w-1/2">
            <h2 className="text-2xl text-bold mb-4">{cancersDict[cancerType]}</h2>
            <h2 className="text-md mb-4 text-left">{descriptions[cancerType]}</h2>
            <h2 className="text-2xl text-bold mb-2 mt-6 text-red-400">Treatment Timeline</h2>
            <ul className="list-disc pl-8 space-y-2">
              {timelines[cancerType].map((step, index) => (
                <li key={index} className="text-md text-left text-gray-300">{step}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-6 py-2 bg-[#BF4545] hover:bg-[#D9A3A3] text-white rounded-xl shadow-lg transition-all duration-200"
              onClick={() => setShowPopup(false)} // Close the popup
            >
              Close
            </button>
          </div>
        </div>
      )}

      {captured ? (
        // Captured Image View
        <div className="flex flex-col items-center justify-center w-full h-full px-6">
          <h1 className="text-4xl font-bold text-[#BF4545] bg-gray-800 py-3 px-6 rounded-xl shadow-md mb-4 mt-2">
            Detected Skin Disease:{" "}
            <span
              className="text-[#D9A3A3] font-bold underline cursor-pointer hover:text-[#BF4545] transition-all duration-200"
              onClick={() => setShowPopup(true)} // Show the popup
            >
              {cancersDict[cancerType]}
            </span>
          </h1>
          <div className="flex">
            <img
              className="rounded-2xl w-full max-w-4xl shadow-lg"
              src={frame}
              alt="Captured Frame"
            />
            <div className="bg-blue-50"></div>
          </div>
          <div className="flex items-center justify-center bg-gray-800 py-6 px-4 mt-3 rounded-2xl shadow-lg w-1/2">
            <button
              className="px-12 py-4 bg-[#BF4545] hover:bg-[#D9A3A3] text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
              onClick={() => setCaptured(false)} // Return to live camera feed
            >
              Back to Camera
            </button>
          </div>
        </div>
      ) : (
        // Camera View
        <div className="flex flex-col items-center justify-center w-full h-full px-6">
          <h1 className="text-4xl font-bold text-[#BF4545] bg-gray-800 py-3 px-6 rounded-xl shadow-md mb-4 mt-2">
            Analysis Results Appear Here
          </h1>
          <div className="flex">
            <Webcam
              ref={webcamRef}
              className="rounded-2xl w-full max-w-4xl shadow-lg transform scale-x-[-1]" // Mirror the video feed
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <div className="bg-blue-50"></div>
          </div>
          <div className="flex items-center justify-center bg-gray-800 pb-10 pt-2 px-4 mt-2 rounded-2xl shadow-lg w-1/2">
            <button
              className="px-12 py-4 bg-[#BF4545] hover:bg-[#D9A3A3] text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
              onClick={captureImage} // Capture and process the image
            >
              Take Picture to Analyze Skin
            </button>
          </div>
        </div>
      )}
    </div>
    </main>
  );
};

export default CameraDetect;
