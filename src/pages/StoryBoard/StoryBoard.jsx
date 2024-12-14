import { useState } from 'react';
import './StoryBoard.css';
import Navbar from '../Navbar';

// Sample story data
const stories = [
  {
    id: 1,
    name: "John Lopez",
    story: "SkinScope detected a suspicious mole on my arm that led to an early diagnosis of skin cancer. Thanks to SkinScope, I received timely treatment and am cancer-free today. I can't imagine what would have happened if I had waited longer.",
    stickyNoteImage: "/storyboard/yellow.png"
  },
  {
    id: 2,
    name: "Jane Smith",
    story: "My family used SkinScope during our routine checkups. It helped us spot early signs of skin cancer in my father, saving his life. We now advocate for regular skin checks and SkinScope has been a game-changer in our lives.",
    stickyNoteImage: "/storyboard/red.png"
  },
  {
    id: 3,
    name: "Alice Johnson",
    story: "SkinScope helped me identify skin cancer on my back that I had ignored for months. It was too late for a simple treatment, but SkinScope saved me from much worse. I’m grateful for its accuracy.",
    stickyNoteImage: "/storyboard/blue.png"
  },
  {
    id: 4,
    name: "Robert Brown",
    story: "I learned about SkinScope through a health seminar. After using it, I found a few irregularities on my skin, and they were diagnosed as early-stage skin cancer. Thanks to the early detection, I’m now fully recovered.",
    stickyNoteImage: "/storyboard/green.png"
  },
  {
    id: 5,
    name: "Emily Davis",
    story: "SkinScope helped me overcome my fear of visiting a dermatologist. It identified an abnormal mole on my leg, which was diagnosed as early-stage melanoma. Without SkinScope, I might have delayed seeking help, and I’m so thankful for its role in saving my life.",
    stickyNoteImage: "/storyboard/green.png"
  },
  {
    id: 6,
    name: "Micheal Wilson",
    story: "As a construction worker, I’m constantly exposed to the sun. SkinScope flagged a suspicious spot on my shoulder that turned out to be basal cell carcinoma. I’m now more mindful of sun protection and grateful for the early detection.",
    stickyNoteImage: "/storyboard/blue.png"
  },
  {
    id: 7,
    name: "Sophia Martinez",
    story: "SkinScope's precision saved me from a dangerous diagnosis. A small spot on my face that seemed harmless turned out to be skin cancer. The app encouraged me to seek medical advice in time, and I’m forever grateful for the technology.",
    stickyNoteImage: "/storyboard/red.png"
  },
  {
    id: 8,
    name: "David Clark",
    story: "My teenage daughter found SkinScope easy to use. When it flagged a mole on her back, we got it checked and caught melanoma at its earliest stage. SkinScope has given us peace of mind and made us proactive about skin health.",
    stickyNoteImage: "/storyboard/yellow.png"
  },
];

const StoryBoard = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  // Set fixed positions and rotations for each sticky note
  const stickyNotePositions = [
    { top: '20%', left: '10%', rotation: '5deg' },
    { top: '12%', left: '80%', rotation: '-5deg' },
    { top: '15%', left: '30%', rotation: '-10deg' },
    { top: '22%', left: '55%', rotation: '-10deg' },
    { top: '60%', left: '10%', rotation: '-10deg' },
    { top: '52%', left: '80%', rotation: '-15deg' },
    { top: '55%', left: '32%', rotation: '15deg' },
    { top: '65%', left: '55%', rotation: '12deg' }
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
            transform: `rotate(${stickyNotePositions[index].rotation})`
          }}
          onClick={() => handleNoteClick(story)}
        >
          <img src={story.stickyNoteImage} alt={`${index} sticky note`} className="sticky-note-image"/>
          <p>{story.name}</p>
        </div>
      ))}

      {selectedStory && (
        <div className="modal-overlay" onClick={closeStoryModal}>
          <div className="modal">
            <h2>{selectedStory.name}&#39;s Story</h2>
            <p>{selectedStory.story}</p>
            <button onClick={closeStoryModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBoard;