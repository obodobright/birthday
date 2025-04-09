"use client";

import { useState, useEffect } from "react";

// Target birthday date (April 3rd of the current year)
// NOTE: Months are 0-indexed in JavaScript Date (0 = January, 3 = April)
const BIRTHDAY_MONTH = 3; // April
const BIRTHDAY_DAY = 9;

const CountdownDisplay = ({ onBirthdayReached }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client after hydration
    setIsClient(true); 

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Use the current year for the target birthday
      let birthdayThisYear = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY);
      let birthdayNextYear = new Date(currentYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);

      // Check if today is the birthday
      const isBirthdayToday = now.getDate() === BIRTHDAY_DAY && now.getMonth() === BIRTHDAY_MONTH;

      if (isBirthdayToday) {
        // It's your birthday today! Don't show countdown
        onBirthdayReached?.(); // Notify parent component
        return null;
      } else if (now > birthdayThisYear) {
        // Birthday has passed, target next year
        const difference = birthdayNextYear - now;
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        // Birthday is coming up
        const difference = birthdayThisYear - now;
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    };

    // Set initial time left
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        clearInterval(timer); // Stop timer if birthday is reached
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [onBirthdayReached]);

  // Avoid rendering countdown on server / during hydration mismatch
  if (!isClient || timeLeft === null) {
    return (
       <div className="text-center text-xl text-pink-600 dark:text-pink-300 animate-pulse">
            Loading countdown...
       </div>
    ); // Or a loading spinner
  }

  // Check if countdown has hit zero (should be handled by interval clear, but belts and braces)
   if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
     // This state should ideally be managed by the parent via onBirthdayReached
     // But we prevent rendering the countdown numbers if it hits zero here.
     return null; 
   }


  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <p className="text-xl md:text-2xl text-pink-700 dark:text-pink-200 mb-4 font-serif">
        Something special is loading…
      </p>
      <p className="text-lg md:text-xl text-pink-600 dark:text-pink-300 mb-2 font-serif">
        Your surprise unlocks in:
      </p>

      {/* Countdown Timer */}
      <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6 text-pink-500 dark:text-pink-400">
        <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-pink-900/50 rounded-lg shadow">
          <div className="text-3xl md:text-5xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm uppercase tracking-wider">Days</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-pink-900/50 rounded-lg shadow">
          <div className="text-3xl md:text-5xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm uppercase tracking-wider">Hours</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-pink-900/50 rounded-lg shadow">
          <div className="text-3xl md:text-5xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm uppercase tracking-wider">Minutes</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-pink-900/50 rounded-lg shadow">
          <div className="text-3xl md:text-5xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-xs md:text-sm uppercase tracking-wider">Seconds</div>
        </div>
      </div>

      <p className="text-base md:text-lg italic text-rose-600 dark:text-rose-300 mb-4 font-serif">
        "You're not just getting older… You're unlocking the next level."
      </p>
      <p className="text-sm md:text-base text-purple-700 dark:text-purple-300 font-serif">
        "You'll need your brain and your heart to unlock what's waiting…"
      </p>
    </div>
  );
};

export default CountdownDisplay; 