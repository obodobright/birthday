"use client";

import React from 'react';

const UnlockPrompt = ({ onUnlock }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <p className="text-lg md:text-xl text-pink-700 dark:text-pink-200 mb-6 font-serif max-w-lg">
        I know you love puzzles and games. So… let's make you work for it.
        Complete this task to unlock the first surprise.
      </p>
      <button
        onClick={onUnlock}
        className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-serif"
      >
        Click to view your surprise
      </button>
    </div>
  );
};

export default UnlockPrompt; 