"use client";

import { useState } from "react";
import BirthdayConfetti from "./components/BirthdayConfetti";
import CountdownDisplay from "./components/CountdownDisplay";
import UnlockPrompt from "./components/UnlockPrompt";
import RiddleGame from "./components/RiddleGame";
import PhotoSlideshow from "./components/BirthdaySlideshow";
import PuzzlePrompt from "./components/PuzzlePrompt";
import AnagramPuzzle from "./components/AnagramPuzzle";
import PlaylistChoice from "./components/PlaylistChoice";
import ScavengerHunt from "./components/ScavengerHunt";
import FinalMessage from "./components/FinalMessage";

// Define stage constants
const STAGES = {
  COUNTDOWN: 'countdown',
  UNLOCK: 'unlock',
  RIDDLE: 'riddle',
  SLIDESHOW_1: 'slideshow1',
  PUZZLE_PROMPT: 'puzzle_prompt',
  PUZZLE: 'puzzle',
  PLAYLIST: 'playlist',
  SLIDESHOW_2: 'slideshow2',
  SCAVENGER: 'scavenger',
  FINAL: 'final',
};

// Placeholder photo URLs for the slideshows
// TODO: Replace with actual meaningful photos
const photos1 = [
  "https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_3050b0d9.jpg?updatedAt=1744176501920",
  "https://ik.imagekit.io/hydekcjmz/cherryl/child1.jpg?updatedAt=1744176502185",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_cc1fac80.jpg?updatedAt=1744176500964",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_51d4d4d0.jpg?updatedAt=1744176501316",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.35_a8e0f6ad.jpg?updatedAt=1744176501616",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.20_3b29a634.jpg?updatedAt=1744176501978",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.42_0b58b561.jpg?updatedAt=1744176504847",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_3050b0d9.jpg?updatedAt=1744176501920",
"https://ik.imagekit.io/hydekcjmz/cherryl/child1.jpg?updatedAt=1744176502185",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_cc1fac80.jpg?updatedAt=1744176500964",

];

const photos2 = [
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.01_6c5f825f.jpg?updatedAt=1744176501910",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_d644a0cc.jpg?updatedAt=1744176502032",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.45_074e9c6b.jpg?updatedAt=1744176501906",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.09_5c68f63f.jpg?updatedAt=1744176501707",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.42_5dac9836.jpg?updatedAt=1744176505403",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.42_0b58b561.jpg?updatedAt=1744176504847",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.42_5dac9836.jpg?updatedAt=1744176505403",
  
  "https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.01_6c5f825f.jpg?updatedAt=1744176501910",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.50.41_d644a0cc.jpg?updatedAt=1744176502032",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.45_074e9c6b.jpg?updatedAt=1744176501906",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.19.09_5c68f63f.jpg?updatedAt=1744176501707",
"https://ik.imagekit.io/hydekcjmz/cherryl/WhatsApp%20Image%202025-04-08%20at%2010.55.16_5f815177.jpg?updatedAt=1744176505946"
]; // Placeholder for the second set of photos

export default function Home() {
  const [stage, setStage] = useState(STAGES.COUNTDOWN); // Start with countdown
  const [showConfetti, setShowConfetti] = useState(false); // Keep confetti state
  const [selectedSongUrl, setSelectedSongUrl] = useState(null); // Add state for selected song URL

  // Function to advance to the next stage
  const advanceStage = (nextStage) => {
    setStage(nextStage);
    // Optionally reset confetti or other states between stages
    setShowConfetti(false);
  };

  // Placeholder function for when the countdown finishes
  const handleBirthdayReached = () => {
    advanceStage(STAGES.UNLOCK);
  };

  // Placeholder function for when the unlock button is clicked
  const handleUnlockClick = () => {
    advanceStage(STAGES.RIDDLE);
  };
  
  // Placeholder for riddle success
  const handleRiddleSuccess = () => {
      setShowConfetti(true); // Confetti on riddle success? Or just final? Let's trigger here for now.
      advanceStage(STAGES.SLIDESHOW_1);
  };
  
  // Placeholder for slideshow 1 end
  const handleSlideshow1End = () => {
      advanceStage(STAGES.PUZZLE_PROMPT);
  };

  // Placeholder for puzzle prompt click
  const handlePuzzlePromptClick = () => {
      advanceStage(STAGES.PUZZLE);
  };
  
  // Placeholder for puzzle success
  const handlePuzzleSuccess = () => {
      advanceStage(STAGES.PLAYLIST);
  };

  // Placeholder for playlist choice -> start slideshow 2
   const handlePlaylistChoice = (song) => {
       console.log("Selected song:", song.title, "URL:", song.url);
       setSelectedSongUrl(song.url); // Store the selected song URL
       advanceStage(STAGES.SLIDESHOW_2);
   };

  // Placeholder for slideshow 2 end
  const handleSlideshow2End = () => {
      advanceStage(STAGES.SCAVENGER);
  };
  
  // Placeholder for scavenger hunt success
  const handleScavengerSuccess = () => {
      setShowConfetti(true); // Confetti on final success
      setTimeout(() => {
        advanceStage(STAGES.FINAL);
      }, 2500); // Delay the stage transition to show confetti
  };


  // Function to render content based on the current stage
  const renderStageContent = () => {
    switch (stage) {
      case STAGES.COUNTDOWN:
        return <CountdownDisplay onBirthdayReached={handleBirthdayReached} />;
      case STAGES.UNLOCK:
        return <UnlockPrompt onUnlock={handleUnlockClick} />;
      case STAGES.RIDDLE:
        return <RiddleGame onSuccess={handleRiddleSuccess} />;
       case STAGES.SLIDESHOW_1:
        return <PhotoSlideshow photos={photos1} onEnd={handleSlideshow1End} durationSeconds={3} />;
       case STAGES.PUZZLE_PROMPT:
        return <PuzzlePrompt onClick={handlePuzzlePromptClick} />;
      case STAGES.PUZZLE:
        return <AnagramPuzzle onSuccess={handlePuzzleSuccess} />;
      case STAGES.PLAYLIST:
         return <PlaylistChoice onSongSelect={handlePlaylistChoice} />;
      case STAGES.SLIDESHOW_2:
         return <PhotoSlideshow 
                    photos={photos2} // Use the second set of photos
                    audioSrc={selectedSongUrl} // Pass the selected song URL
                    onEnd={handleSlideshow2End} 
                    durationSeconds={3} // Or use a different duration/effect
                 />;
      case STAGES.SCAVENGER:
        return <ScavengerHunt onSuccess={handleScavengerSuccess} />;
      case STAGES.FINAL:
        return <FinalMessage />;
      default:
        return <div>Loading...</div>; // Or handle unknown stage
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-pink-950 dark:via-rose-950 dark:to-purple-950 flex items-center justify-center">
      <BirthdayConfetti isActive={showConfetti} />
      <main className="container mx-auto px-4 py-8 text-center">
        {/* Removed static heading - content will be stage-dependent */}
        {renderStageContent()}
      </main>
      {/* <BirthdayMusic /> // Removed - music will be handled differently */}
    </div>
  );
}
