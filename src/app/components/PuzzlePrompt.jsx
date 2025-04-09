"use client";

import React from 'react';

const PuzzlePrompt = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in">
       <p className="text-lg md:text-xl text-pink-700 dark:text-pink-200 mb-6 font-serif max-w-lg">
        You cracked the first challenge.
        But what's a celebration without music?
        Solve this to unlock your soundtrack.
      </p>
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-serif"
      >
        Wait… there's more
      </button>
    </div>
  );
};

export default PuzzlePrompt; 