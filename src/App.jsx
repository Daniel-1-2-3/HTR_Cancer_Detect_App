import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import AiChat from "./pages/AiChat";
import CameraDetect from "./pages/CameraDetect";
import Donation from "./pages/Donation";
import Info from "./pages/Info";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<CameraDetect />} />
        <Route path="/ai-chat" element={<AiChat />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/info" element={<Info />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
