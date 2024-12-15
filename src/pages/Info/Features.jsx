import { useEffect, useRef } from 'react';
import gsap from "gsap";
import './Features.css';

const Features = () => {
  const reviewsRef = useRef(null);

  useEffect(() => {
    const reviews = reviewsRef.current;

    gsap.to(reviews, {
      x: "-100%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  useEffect(() => {
    // Trigger the animation for text reveal when scrolled into view
    const aboutText = document.querySelector('.about-text');
    const image = document.querySelector('.about-image img');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const aboutSectionTop = aboutText.offsetTop;

      if (scrollPosition > aboutSectionTop + 100) {
        aboutText.classList.add('reveal-text');
        image.classList.add('reveal-image');
      }
    });
  }, []);

  const reviews = [
    { name: "Sarah K.", review: "SkinScope helped me identify early signs of skin cancer. I’m so grateful for this platform!" },
    { name: "John M.", review: "The app is easy to use and gave me the knowledge to take proactive steps for my health." },
    { name: "Emily R.", review: "Thanks to SkinScope, I was able to catch something early that my doctor missed. A game changer!" },
    { name: "David L.", review: "I never realized how important skin checks were until I used this app. Highly recommend!" },
    { name: "Sophia P.", review: "SkinScope made it easy to track my skin health. It gives peace of mind." },
    { name: "Michael W.", review: "I’m not one to visit doctors often, but SkinScope made it clear I needed to get a mole checked." },
    { name: "Ava T.", review: "This platform is amazing. I feel more in control of my skin health after using it!" },
    { name: "James C.", review: "SkinScope is simple and informative. It's a must-have for anyone serious about skin care." },
    { name: "Olivia B.", review: "The detection tools were so easy to use. I’m more confident in my skin health decisions." },
    { name: "William D.", review: "This app has changed the way I approach skin cancer prevention. A must-have!" }
  ];

  // Function to determine the gender and return an image URL based on index (even for male, odd for female)
  const getReviewerImage = (index) => {
    const maleImages = [
      `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
    ];
    const femaleImages = [
      `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`
    ];

    return index % 2 === 1  ? maleImages[0] : femaleImages[0];
  };

  // Function to split the review at half the message's length
  const splitReviewText = (reviewText) => {
    const halfLength = Math.floor(reviewText.length / 2);
    const firstHalf = reviewText.slice(0, halfLength);
    const secondHalf = reviewText.slice(halfLength);
    return `${firstHalf}<br/>${secondHalf}`;
  };

  return (
    <section id="about-us" className="about-us-section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              Welcome to SkinScope, where we are dedicated to providing you with the knowledge and tools to detect skin cancer early.
              Our platform combines cutting-edge technology and expert insights to empower you in taking control of your health.
              SkinScope offers an intuitive interface that helps you track, analyze, and monitor your skin’s health, ensuring your health.
            </p>
            <br />
            <p className="about-mission">
              Our mission is to make skin cancer prevention accessible, proactive, and simple for everyone. We believe in the power of early detection to save lives.
            </p>
          </div>
          <div className="about-image">
            <img 
                src="/features.png" 
                alt="About SkinScope" 
                className="image-crop mt-4"
            />
          </div>
        </div>
      </div>
      <div className="reviews-section overflow-hidden bg-gray-100 py-16">
        <div
          ref={reviewsRef}
          className="reviews-wrapper flex gap-16 whitespace-nowrap"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card flex-shrink-0 w-[900px] lg:w-[1000px] xl:w-[1100px] 2xl:w-[1200px] h-auto min-h-[250px] text-center bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="reviewer-info mb-2">
                <img 
                  src={getReviewerImage(index)} 
                  alt={`Reviewer ${review.name}`} 
                  className="reviewer-img w-24 h-24 rounded-full mx-auto"
                />
                <p className="font-bold mt-2">{review.name}</p>
              </div>
              <p className="stars text-yellow-500">★★★★★</p>
              <p className="review-text text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: splitReviewText(review.review) }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
