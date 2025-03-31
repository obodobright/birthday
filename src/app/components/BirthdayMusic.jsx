"use client";

import { useEffect, useRef, useState } from "react";

const BirthdayMusic = ({ isPlaying }) => {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);

  const songs = [
    "https://ik.imagekit.io/hydekcjmz/Wizkid-Kese-Dance-(TrendyBeatz.com).mp3?updatedAt=1743431167121",
    "https://ik.imagekit.io/hydekcjmz/Wizkid-Love-My-Baby-_TrendyBeatz.com_.mp3?updatedAt=1743431552604",
  ];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isPlaying]);

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  return (
    <audio
      ref={audioRef}
      src={songs[currentSongIndex]}
      onEnded={handleSongEnd}
      loop={false}
      className="hidden"
    />
  );
};

export default BirthdayMusic;
