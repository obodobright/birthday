"use client";

import { useState, useEffect } from "react";
import BirthdaySlideshow from "./BirthdaySlideshow";
import BirthdayMusic from "./BirthdayMusic";

const BirthdayCountdown = ({ onBirthday }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isBirthday, setIsBirthday] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showGiftInfo, setShowGiftInfo] = useState(false);
  const [isBirthdayPassed, setIsBirthdayPassed] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSongSelection, setShowSongSelection] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const birthday = new Date(currentYear, 3, 3); // April 3rd (month is 0-based)
      const birthdayEnd = new Date(birthday);
      birthdayEnd.setHours(24, 0, 0, 0);

      const difference = birthday - today;
      const hoursUntilBirthday = difference / (1000 * 60 * 60);

      // If birthday has passed this year
      if (today > birthdayEnd) {
        setIsBirthdayPassed(true);
        setIsBirthday(false);
        return;
      }

      // If it's the birthday (April 3rd)
      if (today.getDate() === 3 && today.getMonth() === 3) {
        setIsBirthday(true);
        onBirthday?.();
        return;
      }

      // If more than 24 hours away
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [onBirthday]);

  const handleSurpriseClick = () => {
    if (isBirthday) {
      setShowSongSelection(true);
    } else {
      setShowSlideshow(true);
    }
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow(false);
    setShowSurprise(true);
  };

  const handleGiftClick = () => {
    setShowGiftInfo(true);
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setShowSlideshow(true);
    setShowSongSelection(false);
  };

  // If birthday has passed, only show gift collection
  if (isBirthdayPassed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
        <div className="bg-white/90 dark:bg-pink-900/90 p-6 rounded-lg shadow-xl max-w-md mx-auto animate-fade-in border border-pink-200 dark:border-pink-800">
          <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
            🎁 Your Gift Awaits! 🎁
          </h3>
          <p className="text-pink-700 dark:text-pink-200 mb-4 font-serif">
            To collect your special birthday gift, please contact:
          </p>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-rose-600 dark:text-rose-300">
              📞 Phone: +1234567890
            </p>
            <p className="text-lg font-semibold text-rose-600 dark:text-rose-300">
              📧 Email: birthday@example.com
            </p>
            <p className="text-lg font-semibold text-rose-600 dark:text-rose-300">
              📍 Address: 123 Birthday Street, Celebration City
            </p>
          </div>
          <p className="mt-4 text-sm text-pink-500 dark:text-pink-400">
            Available for collection from April 4th to April 10th
          </p>
        </div>
      </div>
    );
  }

  // If it's birthday time (within 24 hours)
  if (isBirthday) {
    return (
      <>
        <BirthdayMusic
          isPlaying={showSlideshow}
          onSongSelect={handleSongSelect}
          showSelection={showSongSelection}
        />
        {showSlideshow ? (
          <BirthdaySlideshow onClose={handleCloseSlideshow} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
            <h2 className="md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
              🎉 Happy Birthday! 🎉
            </h2>
            {/* <button
              onClick={() => setIsBirthday(!isBirthday)}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg absolute bottom-3 right-2"
            >
              Test
            </button> */}
            {!showSurprise ? (
              <button
                onClick={handleSurpriseClick}
                className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Click for a Surprise! 🎁
              </button>
            ) : (
              <div className="text-center animate-fade-in">
                <p className="text-xl text-pink-700 leading-relaxed dark:text-pink-200 mb-2 font-serif">
                  Wishing you an amazing day filled with joy!On this special day, I just want to
                  remind you how incredibly amazing you are. Your beauty shines inside and out, and
                  your kindness, intelligence, and warmth make the world a better place. ✨ May
                  today be filled with love, laughter, and everything that makes you smile. You
                  deserve all the happiness in the world, not just today but always. Keep shining,
                  keep being the wonderful person you are, and never stop chasing your dreams!
                  Wishing you a year ahead full of love, success, and unforgettable moments. 💕🎂🎁
                  <br /> Happy Birthday, beautiful! 🥳🎈
                </p>

                {!showGiftInfo ? (
                  <button
                    onClick={handleGiftClick}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    There's More! 🎁
                  </button>
                ) : (
                  <div className="bg-white/90 dark:bg-pink-900/90 p-6 rounded-lg shadow-xl max-w-md mx-auto animate-fade-in border border-pink-200 dark:border-pink-800">
                    <h3 className="md:text-2xl font-bold text-pink-600 dark:text-pink-300 mb-4 font-serif">
                      🎁 Your Gift Awaits! 🎁
                    </h3>
                    <p className="text-pink-700 dark:text-pink-200 mb-4 font-serif">
                      Your package is on the way to you now!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  // If more than 24 hours away, show countdown
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif">
        Time Until Your Birthday
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-rose-500">{timeLeft.days}</div>
          <div className="text-sm text-pink-600 dark:text-pink-400">Days</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-rose-500">{timeLeft.hours}</div>
          <div className="text-sm text-pink-600 dark:text-pink-400">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-rose-500">{timeLeft.minutes}</div>
          <div className="text-sm text-pink-600 dark:text-pink-400">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-rose-500">{timeLeft.seconds}</div>
          <div className="text-sm text-pink-600 dark:text-pink-400">Seconds</div>
        </div>
      </div>
      <p className="text-sm  text-center text-pink-600 dark:text-pink-400">
        A little secret's waiting just for you, but it won't be reveal itself until your beautiful
        day arrives!
      </p>
      <p className="text-sm absolute bottom-2 right-3 text-pink-600 dark:text-pink-400">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default BirthdayCountdown;
