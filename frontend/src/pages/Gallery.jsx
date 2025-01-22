import React, { useState } from 'react';
import './Gallery.css'; 
import image1 from '../assets/mac.png';
import image2 from '../assets/applewatch.png';
import image3 from '../assets/ipad.png';
const images = [
  { id: 1, src: image1, alt: 'Image 1' },
  { id: 2, src: image2, alt: 'Image 2' },
  { id: 3, src: image3, alt: 'Image 3' },
];
const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <div className="gallery-container">
      <div className="image-container">
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="gallery-image" />
        <button className="arrow arrow-left" onClick={goToPrevious}>&#10094;</button>
        <button className="arrow arrow-right" onClick={goToNext}>&#10095;</button>
      </div>
    </div>
  );
};
export default Gallery;