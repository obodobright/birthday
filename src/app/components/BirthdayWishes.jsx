"use client";

import { useState, useEffect } from "react";

const wishes = [
  "May your day be filled with joy and laughter! 🎉",
  "Wishing you all the happiness in the world! 🌟",
  "Here's to another amazing year! 🎂",
  "May all your dreams come true! ✨",
  "Sending you the biggest birthday hugs! 🤗",
  "You're one of a kind! 🌈",
  "May this year bring you endless possibilities! 🚀",
  "You deserve the world! 🌍",
  "Happy Birthday to someone truly special! 🎈",
  "May your day be as wonderful as you are! 💫",
];

const BirthdayWishes = () => {
  const [currentWish, setCurrentWish] = useState(wishes[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * wishes.length);
        setCurrentWish(wishes[randomIndex]);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-4">
      <div className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-xl text-purple-700 dark:text-purple-300 font-medium">{currentWish}</p>
      </div>
    </div>
  );
};

export default BirthdayWishes;
