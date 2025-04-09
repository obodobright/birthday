"use client";

import React from 'react';

// TODO: Customize this list with 3-5 specific songs
const songs = [
  {
    title: "Kizz Daniel - Sooner",
    url: "https://ik.imagekit.io/hydekcjmz/cherryl/Kizz-Daniel-Sooner-(TrendyBeatz.com).mp3?updatedAt=1744201363924"
  },
  {
    title: "Davido ft Faze - Kante",
    url: "https://ik.imagekit.io/hydekcjmz/cherryl/Davido-Ft-Fave-Kante-(TrendyBeatz.com).mp3?updatedAt=1744201361615"
  },
  {
    title: "KCEE - Ojapiano",
    url: "https://ik.imagekit.io/hydekcjmz/cherryl/Kcee-Ojapiano-(TrendyBeatz.com).mp3?updatedAt=1744201362932"
  },
  {
    title: "Omah Lay - Holy Ghost",
    url: "https://ik.imagekit.io/hydekcjmz/cherryl/Omah-Lay-Holy-Ghost-(TrendyBeatz.com).mp3?updatedAt=1744201358621",
  },

  {
    title: "Burna Boy- Kilometer",
    url:"https://ik.imagekit.io/hydekcjmz/cherryl/Burna-Boy-Kilometre-(TrendyBeatz.com).mp3?updatedAt=1744201586965"
  },
  // Add more songs if needed, or trim down to 3-5
];

const PlaylistChoice = ({ onSongSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in max-w-md mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif">
        Choose Your Vibe...
      </h2>

      <div className="bg-white/70 dark:bg-pink-900/70 p-6 rounded-lg shadow-md mb-6 border border-pink-200 dark:border-pink-800 w-full space-y-4">
        {songs.map((song, index) => (
          <button
            key={index}
            onClick={() => onSongSelect?.(song)} // Pass the whole song object back
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-3 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow text-left flex items-center space-x-3"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
             </svg>
            <span>{song.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaylistChoice; 