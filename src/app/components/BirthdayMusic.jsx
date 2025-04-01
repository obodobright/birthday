"use client";

import { useEffect, useRef, useState } from "react";

const BirthdayMusic = ({ isPlaying, onSongSelect, showSelection }) => {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showSongSelection, setShowSongSelection] = useState(false);

  const songs = [
    {
      title: "Kese (Dance)",
      url: "https://ik.imagekit.io/hydekcjmz/Wizkid-Kese-Dance-(TrendyBeatz.com).mp3?updatedAt=1743431167121",
    },
    {
      title: "Love My Baby",
      url: "https://ik.imagekit.io/hydekcjmz/Wizkid-Love-My-Baby-_TrendyBeatz.com_.mp3?updatedAt=1743431552604",
    },
    {
      title: "Essence",
      url: "https://ik.imagekit.io/hydekcjmz/Tems-Ft-Wizkid-Essence-_TrendyBeatz.com_.mp3?updatedAt=1743504275611",
    },
    {
      title: "Gidi Girl",
      url: "https://ik.imagekit.io/hydekcjmz/Wizkid-Gidi-Girl-_TrendyBeatz.com_.mp3?updatedAt=1743504272558",
    },
  ];

  useEffect(() => {
    if (showSelection) {
      setShowSongSelection(true);
    }
  }, [showSelection]);

  useEffect(() => {
    // Initialize audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.onended = handleSongEnd;
    }

    // Handle play/pause
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [isPlaying, currentSongIndex]);

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setShowSongSelection(false);
    onSongSelect?.(songs[index]);
  };

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  if (showSongSelection) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white/90 dark:bg-pink-900/90 p-8 rounded-lg shadow-xl max-w-md mx-auto animate-fade-in border border-pink-200 dark:border-pink-800">
          <h3 className="text-xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif text-center">
            I know you are a fan of Wizkid, choose your favorite song 🎵
          </h3>
          <div className="space-y-4">
            {songs.map((song, index) => (
              <button
                key={index}
                onClick={() => handleSongSelect(index)}
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-left"
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BirthdayMusic;
