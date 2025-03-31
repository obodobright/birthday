"use client";

import { useState } from "react";
import BirthdayCountdown from "./components/BirthdayCountdown";
import BirthdayWishes from "./components/BirthdayWishes";
import BirthdayConfetti from "./components/BirthdayConfetti";
import BirthdayMusic from "./components/BirthdayMusic";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-pink-950 dark:via-rose-950 dark:to-purple-950">
      <BirthdayConfetti isActive={showConfetti} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-pink-600 dark:text-pink-300 mb-8 font-serif">
            My Asanwa!!!
          </h1>
          <BirthdayCountdown onBirthday={() => setShowConfetti(true)} />
          <BirthdayWishes />
        </div>
      </main>
      <BirthdayMusic />
    </div>
  );
}
