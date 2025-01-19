import React, { useEffect, useRef, useState } from "react";
import ramImage from "../../assets/Images/ram.png"; // Replace with the path to your PNG image
import shl1 from '../../assets/Images/school-1.jpg';
import shl2 from '../../assets/Images/school-2.png';
import clg from '../../assets/Images/college.png';

import "./About.css";

const About = () => {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer to trigger the animation when About section enters view
    const observer = new IntersectionObserver(
      (entries) => {
        const isInView = entries[0].isIntersecting;
        setIsVisible(isInView); // Trigger animation only when in view
      },
      {
        threshold: 0.5, // Trigger when 50% of the About section is visible
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Carousel setup
  const carouselImages = [shl1, shl2, clg];
  const carouselTexts = [
    "Began my academic journey at Vivekananda School, where I completed up to 3rd standard, laying a strong foundation for learning",
    "Completed my schooling from Shri VidhyaBharathi Matric Higher Secondary School, finishing my 12th standard with a focus on academic excellence.",
    "Currently pursuing a B.E. in Computer Science and Design at Kongu Engineering College, honing my skills in technology and innovation."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="about-section" ref={aboutRef}>
      <div className="about-card">
        {/* Left Section: Image */}
        <div className="image-container-about">
          <div className="drawing-wrapper">
            <img
              src={ramImage}
              alt="Profile"
              className={`profile-image ${isVisible ? "drawing-animation" : ""}`}
            />
          </div>
        </div>

        {/* Right Section: Text + Carousel */}
        <div className="text-container-about">
          <h2 className="text-container-about-h2">About Me</h2>

          {/* Dynamic Text based on Carousel Image */}
          <div className="dynamic-text-container">
            <p>{carouselTexts[currentIndex]}</p>
          </div>

          {/* Carousel */}
          <div className="carousel-container">
            <div className="carousel-slide">
              <img src={carouselImages[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
