import React, { useEffect, useState } from 'react';
import '../componentStyles/ImageSlider.css';

const images = [
  "./images/banner1.jpg",
  "./images/banner5.jpg",
  "./images/banner2.jpg",
  "./images/banner3.jpg",
  "./images/banner4.jpg"

];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-slider-container">

      {/* Slider Images */}
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="slider-btn prev-btn" onClick={prevSlide}>
        ❮
      </button>
      <button className="slider-btn next-btn" onClick={nextSlide}>
        ❯
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;