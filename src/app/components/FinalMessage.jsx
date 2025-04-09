"use client";

import React, { useEffect, useRef } from 'react';

const FinalMessage = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
    }
  }, []);

  const messageParagraphs = [
    "Happy Birthday, you magical unicorn of a human!",
    "Another year older… though honestly, you still look like you just turned 21 (with better style and a better skincare routine). I don't know how you do it — you're beautiful, hilarious, and somehow managing life like a pro while being an incredible mother, a genius in disguise, and the kindest soul in any room.",
    "You're the type of person who can make people laugh and feel loved in the same sentence. Thoughtful to a fault, smarter than you give yourself credit for, and just overall an absolute gem of a human being.",
    "I hope today — and every day after — brings you everything you've ever wished for (plus some extra just for being awesome). You deserve the best life has to offer and then some. So here's to more joy, more laughs, more love, and all the good things landing right in your lap.",
    "Now go enjoy your day, birthday queen — the world is better with you in it."
  ];
// 
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in max-w-2xl mx-auto">
      <audio
        ref={audioRef}
        src="https://ik.imagekit.io/hydekcjmz/cherryl/Adekunle-Gold-Happy-Birthday-Ft-Simi-And-DeJa-(TrendyBeatz.com).mp3?updatedAt=1744177858364"
        loop
        preload="auto"
      >
        Your browser does not support the audio element.
      </audio>
      
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-300 mb-8 font-serif">
         💖 A Message For You 💖
      </h2>

      <div className="bg-white/80 dark:bg-pink-900/80 p-6 md:p-8 rounded-lg shadow-xl border border-pink-200 dark:border-pink-800 w-full text-left space-y-4">
        {messageParagraphs.map((paragraph, index) => (
          <p key={index} className="text-base md:text-lg text-pink-800 dark:text-pink-100 leading-relaxed font-serif">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Optional: Add a closing button or link if desired */}
      {/* <button className="mt-8 ...">Close</button> */}
    </div>
  );
};

export default FinalMessage; 