"use client";

import { useState } from 'react';

const RiddleGame = ({ onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // null: unanswered, true: correct, false: incorrect
  const [showFeedback, setShowFeedback] = useState(false);

  const riddleText = [
    "I'm the boss of the remote,",
    "but I've never paid rent.",
    "I lie around all day,",
    "and still act important.",
    "You shout my name when I vanish,",
    "but forget me when I'm found.",
    "What am I?",
  ];

  const correctAnswers = ['couch', 'sofa'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = answer.trim().toLowerCase();
    const correct = correctAnswers.includes(userAnswer);

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      // Wait a moment to show feedback before proceeding
      setTimeout(() => {
        onSuccess?.();
      }, 2500); // Adjust delay as needed (2.5 seconds)
    }
  };

  return (
    <div className="fle flex-col items-center justify-center text-center p-4 animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-300 mb-6 font-serif">
        Game 1: The Not-So-Humble Object
      </h2>

      <div className="bg-white/70 dark:bg-pink-900/70 p-6 rounded-lg shadow-md mb-6 border border-pink-200 dark:border-pink-800">
        {riddleText.map((line, index) => (
          <p key={index} className="text-lg text-pink-700 dark:text-pink-200 mb-1 italic font-serif">
            {line}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            // Reset feedback if user starts typing again
            if (showFeedback) {
                setShowFeedback(false);
                setIsCorrect(null);
            }
          }}
          placeholder="Your answer..."
          className="w-full max-w-md px-4 py-2 mb-4 border border-pink-300 dark:border-pink-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-pink-800/50 dark:text-white placeholder-pink-400 dark:placeholder-pink-300"
          disabled={isCorrect === true} // Disable input after correct answer
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-rose-400 to-purple-400 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-serif disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!answer.trim() || isCorrect === true}
        >
          Submit Answer
        </button>
      </form>

      {showFeedback && (
        <div className="mt-4 p-3 rounded-lg text-center font-serif w-full max-w-md mx-auto animate-fade-in">
          {isCorrect === true && (
            <p className="text-green-700 dark:text-green-300 font-semibold">
              Exactly! The throne of laziness and forgotten snacks. Well done. ✨
            </p>
          )}
          {isCorrect === false && (
            <p className="text-red-600 text-center dark:text-red-300 font-semibold">
              Not quite... Try thinking a bit more literally about where remotes hang out! 🤔
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RiddleGame; 