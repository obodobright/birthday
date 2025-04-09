"use client";

import { useState } from 'react';

const ScavengerHunt = ({ onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // null, true, false
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);

  const puzzleText = [
      "This isn't just a location.",
      "It's where we shared something for the first time —",
      "Outdoors. Exciting. Unforgettable.",
      "What's the name of that place?"
  ];
  const hint1Text = "The answer is one word. Search our WhatsApp chat for: 'basketball shorts'. (*wink*)";
  const hint2Text = "You had to wear basketball shorts after that meet. That should help jog your memory.";
  const correctAnswer = "MAGHULL"; // Expect uppercase

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = answer.trim().toUpperCase();
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onSuccess?.();
      }, 2500); // Delay for feedback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in max-w-lg mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif">
        Final Challenge: The Memory Locator
      </h2>

      <div className="bg-white/70 dark:bg-pink-900/70 p-6 rounded-lg shadow-md mb-6 border border-pink-200 dark:border-pink-800 w-full">
        {puzzleText.map((line, index) => (
            <p key={index} className="text-lg text-pink-700 dark:text-pink-200 mb-2 italic font-serif">
                {line}
            </p>
        ))}
      </div>

      {/* Hints Section */}
      <div className="w-full max-w-md mb-6 space-y-3 text-sm">
         {!showHint1 && !isCorrect && (
             <button 
                onClick={() => setShowHint1(true)}
                className="text-purple-600 dark:text-purple-300 hover:underline text-xs font-serif"
             >
                 Need a hint?
            </button>
         )}
         {showHint1 && (
             <p className="text-purple-700 dark:text-purple-200 bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md font-serif animate-fade-in">
                <strong>Hint 1:</strong> {hint1Text}
             </p>
         )}
         {showHint1 && !showHint2 && !isCorrect && (
             <button 
                onClick={() => setShowHint2(true)} 
                className="text-purple-600 dark:text-purple-300 hover:underline text-xs font-serif pl-2"
             >
                 Still need another hint?
            </button>
         )}
         {showHint2 && (
            <p className="text-purple-700 dark:text-purple-200 bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md font-serif animate-fade-in">
                <strong>Hint 2:</strong> {hint2Text}
            </p>
         )}
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
          placeholder="Name of the place..."
          className="w-full max-w-xs px-4 py-2 mb-4 border border-pink-300 dark:border-pink-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-pink-800/50 dark:text-white placeholder-pink-400 dark:placeholder-pink-300 uppercase tracking-wider"
          disabled={isCorrect === true}
          autoCapitalize="characters"
          style={{ textTransform: 'uppercase' }}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-rose-400 to-purple-400 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-serif disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!answer.trim() || isCorrect === true}
        >
          Submit Location
        </button>
      </form>

      {showFeedback && (
        <div className="mt-4 p-3 rounded-lg text-center font-serif w-full max-w-xs animate-fade-in">
          {isCorrect === true && (
            <p className="text-green-700 dark:text-green-300 font-semibold">
              YES! You found it! 🎉 Prepare for the final message...
            </p>
          )}
          {isCorrect === false && (
            <p className="text-red-600 dark:text-red-300 font-semibold">
              Not quite the spot I remember... Think back to that first time! Use the hints if you need them. 😉
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScavengerHunt; 