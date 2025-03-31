"use client";

import { useState, useEffect } from "react";

const BirthdaySlideshow = ({ onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLastImage, setIsLastImage] = useState(false);

  // Using random images from Unsplash with birthday-related themes
  const images = [
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9078.JPG?updatedAt=1743428086948",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9083.JPG?updatedAt=1743428083727",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9364.JPG?updatedAt=1743428083713",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9103.JPG?updatedAt=1743428083320",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9305.JPG?updatedAt=1743428083165",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9100.JPG?updatedAt=1743428082543",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9358.JPG?updatedAt=1743428081772",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9124.JPG?updatedAt=1743428081813",
    "https://ik.imagekit.io/hydekcjmz/birthday/IMG_9138.JPG?updatedAt=1743428081973",
    "https://ik.imagekit.io/hydekcjmz/birthday/WhatsApp%20Image%202025-03-26%20at%2001.07.01_f800dc4f.jpg?updatedAt=1743428072490",
  ];

  // Handle progress bar animation
  useEffect(() => {
    setProgress(0);
    setIsLastImage(currentImageIndex === images.length - 1);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / 30; // Complete in 30 seconds
      });
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [currentImageIndex]);

  // Handle auto-advancement
  useEffect(() => {
    const advanceTimer = setTimeout(() => {
      if (currentImageIndex === images.length - 1) {
        // On last image, wait for progress to complete then close
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 30000); // Change image every 30 seconds

    return () => clearTimeout(advanceTimer);
  }, [currentImageIndex, onClose]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    if (currentImageIndex === images.length - 1) {
      onClose();
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
        {images.map((_, index) => (
          <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            {index === currentImageIndex && (
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
        aria-label="Close slideshow"
      >
        ✕
      </button>

      {/* Main image */}
      <div className="relative h-full w-full">
        <img
          src={images[currentImageIndex]}
          alt={`Birthday celebration ${currentImageIndex + 1}`}
          className="w-full h-full object-contain bg-black"
        />

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Next image"
        >
          {isLastImage ? "✓" : "→"}
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default BirthdaySlideshow;
