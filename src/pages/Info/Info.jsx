import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import Timeline from "./Timeline.jsx"; // The timeline or the info content
import Navbar from "../Navbar.jsx";
import { useState } from "react";
import AIChat from "./ChatBot.jsx";

function LandingPage() {
    const [showChat, setShowChat] = useState(false);

    return (
        <main className="relative min-h-screen w-screen">
            <Navbar />
            <div className="flex-col relative">
                <Hero/>
                <Features/>
                <Timeline/>
            </div>

            {!showChat && (
                <button
                    onClick={() => setShowChat(true)}
                    className="fixed bottom-4 right-4 z-50 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white p-3 rounded-full shadow-lg transition-opacity hover:opacity-90"
                >
                    Chat
                </button>
            )}

            {/* Chat window */}
            {showChat && (
                <div
                    className="fixed bottom-16 right-4 z-50 shadow-lg animate-fade-in"
                    onAnimationEnd={(e) => e.currentTarget.classList.remove("animate-fade-in")}
                >
                    <AIChat closeChat={() => setShowChat(false)} />
                </div>
            )}
        </main>
    );
}

export default LandingPage;