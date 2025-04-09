"use client";

import { useState } from 'react';

const AnagramPuzzle = ({ onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // null, true, false
  const [showFeedback, setShowFeedback] = useState(false);

  const scrambledWord = "SLIETN";
  const correctAnswer = "LISTEN";
  const hint = "It's what your favorite songs used to be before you hit play.";

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = answer.trim().toUpperCase(); // Compare in uppercase
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      // Wait a moment for feedback before proceeding
      setTimeout(() => {
        onSuccess?.();
      }, 2500); // 2.5 seconds delay
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in max-w-md mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif">
        Game 2: The Hidden Tune
      </h2>

      <div className="bg-white/70 dark:bg-pink-900/70 p-6 rounded-lg shadow-md mb-6 border border-pink-200 dark:border-pink-800 w-full">
         <p className="text-lg text-pink-700 dark:text-pink-200 mb-4 font-serif">
            Unscramble the letters below to reveal a word:
         </p>
         <p className="text-4xl font-bold tracking-widest text-purple-600 dark:text-purple-300 mb-4 font-mono">
            {scrambledWord}
         </p>
         <p className="text-sm italic text-pink-600 dark:text-pink-400">
            Hint: {hint}
         </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <input
          type="text"
          value={answer}
          onChange={(e) => {
              setAnswer(e.target.value);
              if (showFeedback) {
                  setShowFeedback(false);
                  setIsCorrect(null);
              }
          }}
          placeholder="Unscrambled word..."
          className="w-full max-w-xs px-4 py-2 mb-4 border border-pink-300 dark:border-pink-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-pink-800/50 dark:text-white placeholder-pink-400 dark:placeholder-pink-300 uppercase tracking-wider" // Force uppercase input display maybe?
          maxLength={correctAnswer.length} // Limit input length
          disabled={isCorrect === true}
          autoCapitalize="characters" // Suggest uppercase on mobile
          style={{ textTransform: 'uppercase' }} // Visually force uppercase
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-rose-400 to-purple-400 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-serif disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!answer.trim() || isCorrect === true || answer.length !== correctAnswer.length}
        >
          Check Answer
        </button>
      </form>

      {showFeedback && (
        <div className="mt-4 p-3 rounded-lg text-center font-serif w-full max-w-xs animate-fade-in">
          {isCorrect === true && (
            <p className="text-green-700 dark:text-green-300 font-semibold">
              Got it! Time to choose your vibe... 🎶
            </p>
          )}
          {isCorrect === false && (
            <p className="text-red-600 dark:text-red-300 font-semibold">
              Hmm, that doesn't seem right. Give those letters another shuffle! 🧐
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnagramPuzzle; 