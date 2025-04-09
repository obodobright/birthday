"use client";

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';

const PhotoSlideshow = ({ photos = [], durationSeconds = 3, audioSrc, onEnd }) => {
  const audioRef = useRef(null);
  const swiperRef = useRef(null);
  const hasEnded = useRef(false); // Prevent multiple onEnd calls
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
      // Swiper initialization needs to happen client-side
      setIsMounted(true);
      
      // Attempt to autoplay audio when component mounts
      if (audioSrc && audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Autoplay failed:", error);
              // Autoplay was prevented, but we still have the play button
            });
        }
      }
  }, [audioSrc]);

  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Audio play failed:", error);
        });
    }
  };

  const handlePauseClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleSlideChange = (swiper) => {
      // Check if it's the last slide *and* we haven't called onEnd yet
      // swiper.isEnd is true on the last slide *before* looping
      if (swiper.isEnd && !hasEnded.current) {
         hasEnded.current = true; // Mark as ended
         // Delay the onEnd call slightly to allow the last slide transition to finish
         setTimeout(() => {
            onEnd?.();
            if (audioRef.current) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
         }, durationSeconds * 1000); // Wait for the duration of the last slide
      }
  };

  if (!isMounted || !photos || photos.length === 0) {
      // Don't render swiper server-side or without photos
      return (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">
              Loading Slideshow...
          </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <audio 
        ref={audioRef} 
        autoPlay
        src={audioSrc || "https://ik.imagekit.io/hydekcjmz/cherryl/01-Monk-Turner-Fascinoma-Its-Your-Birthday(chosic.com).mp3?updatedAt=1744177549284"}
        loop 
        preload="auto"
      >
        Your browser does not support the audio element.
      </audio>
      {audioSrc && (
        <>
          <button
            onClick={isPlaying ? handlePauseClick : handlePlayClick}
            className="absolute bottom-5 right-5 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </>
      )}

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade]}
        spaceBetween={0} // No space between slides for fade effect
        slidesPerView={1} // Show one slide at a time
        loop={false} // Loop is handled manually by calling onEnd
        effect={"fade"} // Use fade effect
        fadeEffect={{
            crossFade: true // Enable cross-fade
        }}
        autoplay={{
          delay: durationSeconds * 1000, // Use prop for duration
          disableOnInteraction: false, // Keep playing even if user interacts
        }}
        onSlideChangeTransitionEnd={handleSlideChange} // Use transition end to check for last slide
        className="w-full h-full"
      >
        {photos.map((photoUrl, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={photoUrl}
                alt={`Slide ${index + 1}`}
                className="max-w-[90%] max-h-[90%] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

       {/* Optional: Add a visual cue or close button if needed */}
       {/* <button 
            onClick={onEnd} 
            className="absolute bottom-5 right-5 z-10 bg-white/20 text-white p-2 rounded-full text-xs"
       >
            Skip
       </button> */}
    </div>
  );
};

export default PhotoSlideshow;
