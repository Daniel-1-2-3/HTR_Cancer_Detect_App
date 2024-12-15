import React, { useState } from "react";
import "./StoryBoard.css";
import Navbar from "../Navbar";

const stories = [
  {
    id: 1,
    name: "John Lopez",
    story: "SkinScope detected a suspicious mole on my arm that led to an early diagnohosis of skin cancer. Thanks to SkinScope, I received timely treatment and am cancer-free today. I can't imagine what would have happened if I had waited longer.",
    stickyNoteImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/JOHN_LOPEZ_%40night20191210_111622-3.jpg/1200px-JOHN_LOPEZ_%40night20191210_111622-3.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    story: "My family used SkinScope during our routine checkups. It helped us spot early signs of skin cancer in my father, saving his life. We now advocate for regular skin checks and SkinScope has been a game-changer in our lives.",
    stickyNoteImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 3,
    name: "Alice Johnson",
    story: "SkinScope helped me identify skin cancer on my back that I had ignored for months. It was too late for a simple treatment, but SkinScope saved me from much worse. I’m grateful for its accuracy.",
    stickyNoteImage: "https://cppsa.au/files/9/_P7A3201%20copy_Alice%20Johnson.jpg",
  },
  {
    id: 4,
    name: "Robert Brown",
    story: "I learned about SkinScope through a health seminar. After using it, I found a few irregularities on my skin, and they were diagnosed as early-stage skin cancer. Thanks to the early detection, I’m now fully recovered.",
    stickyNoteImage: "https://www.royalroads.ca/sites/default/files/styles/max_650x650/public/2021-03/robert_brown_1200.jpg?itok=Z2y7HvEa",
  },
  {
    id: 5,
    name: "Emily Davis",
    story: "SkinScope helped me overcome my fear of visiting a dermatologist. It identified an abnormal mole on my leg, which was diagnosed as early-stage melanoma. Without SkinScope, I might have delayed seeking help, and I’m so thankful for its role in saving my life.",
    stickyNoteImage: "https://www.physics.columbia.edu/sites/default/files/styles/cu_crop/public/content/davis-emily-cropped.png?itok=LWEUSjd7",
  },
  {
    id: 6,
    name: "Michael Wilson",
    story: "As a construction worker, I’m constantly exposed to the sun. SkinScope flagged a suspicious spot on my shoulder that turned out to be basal cell carcinoma. I’m now more mindful of sun protection and grateful for the early detection.",
    stickyNoteImage: "https://magazine.utoronto.ca/wp-content/uploads/2015/12/f-UT1601-HealthyMinds-sidebar-MichaelWilson_PJ_480-1200x630-c-default.jpg",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    story: "SkinScope's precision saved me from a dangerous diagnosis. A small spot on my face that seemed harmless turned out to be skin cancer. The app encouraged me to seek medical advice in time, and I’m forever grateful for the technology.",
    stickyNoteImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT6ikYe2zorWfgf_MUeJfRZNFuJ9eeMzqY3Q&s",
  },
  {
    id: 8,
    name: "David Clark",
    story: "My teenage daughter found SkinScope easy to use. When it flagged a mole on her back, we got it checked and caught melanoma at its earliest stage. SkinScope has given us peace of mind and made us proactive about skin health.",
    stickyNoteImage: "https://m.media-amazon.com/images/M/MV5BMmY2NmI4N2MtMGNhNy00YWVhLWFkMWEtOGVkMWU1YmY2OWM5XkEyXkFqcGc@._V1_.jpg",
  },
];

const StoryBoard = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  
  const stickyNotePositions = [
    { top: "20%", left: "10%", rotation: "5deg" },
    { top: "12%", left: "80%", rotation: "-5deg" },
    { top: "15%", left: "30%", rotation: "-10deg" },
    { top: "22%", left: "55%", rotation: "-10deg" },
    { top: "60%", left: "10%", rotation: "-10deg" },
    { top: "52%", left: "80%", rotation: "-15deg" },
    { top: "55%", left: "32%", rotation: "15deg" },
    { top: "65%", left: "55%", rotation: "12deg" },
  ];

  const handleNoteClick = (story) => {
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  return (
      <div className="storyboard-container">
        <Navbar />
        {stories.map((story, index) => (
            <div
                key={index}
                className="sticky-note"
                style={{
                  top: stickyNotePositions[index].top,
                  left: stickyNotePositions[index].left,
                  transform: `rotate(${stickyNotePositions[index].rotation})`,
                }}
                onClick={() => handleNoteClick(story)}
            >
              <img
                  src={story.stickyNoteImage}
                  alt={`Sticky note ${index}`}
                  className="sticky-note-image"
              />
            </div>
        ))}

        {selectedStory && (
            <div className="modal-overlay" onClick={closeStoryModal}>
              <div className="modal">
                <h2>{selectedStory.name}'s Story</h2>
                <p>{selectedStory.story}</p>
                <button onClick={closeStoryModal}>Close</button>
              </div>
            </div>
        )}
      </div>
  );
};

export default StoryBoard;
