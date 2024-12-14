import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import CameraDetect from "./pages/CameraDetect/CameraDetect";
import StoryBoard from "./pages/StoryBoard/StoryBoard";
import Info from "./pages/Info/Info";
import LandingPage from "./pages/LandingPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/camera" element={<CameraDetect />} />
        <Route path="/storyboard" element={<StoryBoard />} />
        <Route path="/info" element={<Info />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;