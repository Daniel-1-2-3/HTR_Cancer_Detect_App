import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import "./LandingPage.css"; // Import the CSS file

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate("/info");
    }, 3000);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Spline Scene */}
      <Spline scene="https://prod.spline.design/pBardTTBqAtSG7ki/scene.splinecode" />
      
      {/* Logo and Text */}
      <div className="logo-container">
        <img src="/Navbar.png" alt="Logo" className="logo" />
        <span className="logo-text">SkinScope</span>
      </div>
    </div>
  );
}

export default LandingPage;