import React, { useState } from "react";
import { BreathingExercise } from "./components/BreathingExercise";
import { MemoryMatch } from "./components/MemoryMatch";
import { QuickMath } from "./components/QuickMath";
import { ReactionTimer } from "./components/ReactionTimer";
import { AffirmationQuiz } from "./components/AffirmationQuiz";
import { NumberPuzzle } from "./components/NumberPuzzle";
import { WordScramble } from "./components/WordScramble";
import { SimonSays } from "./components/SimonSays";

// Mood-to-activity mapping
const moodActivities = {
  Stressed: [
    { name: "Memory Match", component: MemoryMatch },
    { name: "Reaction Timer", component: ReactionTimer },
    { name: "Word Scramble", component: WordScramble },
  ],
  Happy: [
    { name: "Quick Math", component: QuickMath },
    { name: "Affirmation Quiz", component: AffirmationQuiz },
    { name: "Simon Says", component: SimonSays },
  ],
  Sad: [
    { name: "Reaction Timer", component: ReactionTimer },
    { name: "Breathing Exercise", component: BreathingExercise },
    { name: "Number Puzzle", component: NumberPuzzle },
  ],
};

// Colors for each mood
const moodColors = {
  Stressed: "#ff6b6b",
  Happy: "#ffd93d",
  Sad: "#4dabf7",
};

export default function MoodApp() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleGameComplete = (pointsEarned = 10) => {
    setTotalScore((prev) => prev + pointsEarned); // add points cumulatively
    setGameCompleted(true);
  };

  const resetToMenu = () => {
    setSelectedGame(null);
    setGameCompleted(false);
  };

  // Gradient background based on mood
  const backgroundStyle = {
    minHeight: "100vh",
    padding: 20,
    textAlign: "center",
    background: selectedMood
      ? `linear-gradient(135deg, ${moodColors[selectedMood]} 0%, #ffffff 100%)`
      : "linear-gradient(135deg, #8fd3f4 0%, #ffffff 100%)",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.5s ease",
  };

  const buttonStyle = {
    margin: 10,
    padding: "15px 25px",
    fontSize: 18,
    borderRadius: 12,
    cursor: "pointer",
    border: "none",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  const gameButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffffff",
    color: "#333",
    fontSize: 16,
  };

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <div style={backgroundStyle}>
        <h2 style={{ fontSize: "2rem", marginBottom: 10 }}>{selectedGame.name}</h2>
        <h3 style={{ color: "#333", marginBottom: 20 }}>⭐ Total Points: {totalScore}</h3>
        {!gameCompleted ? (
          <GameComponent onComplete={handleGameComplete} />
        ) : (
          <div>
            <h3 style={{ color: "#333" }}>🎉 Game Over!</h3>
            <button
              style={{ ...buttonStyle, backgroundColor: "#4dabf7", color: "#fff" }}
              onClick={resetToMenu}
            >
              Back to Game List
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      {!selectedMood ? (
        <>
          <h1 style={{ fontSize: "2.5rem", marginBottom: 30 }}>How are you feeling today? 💭</h1>
          <h3 style={{ marginBottom: 20 }}>⭐ Total Points: {totalScore}</h3>
          {Object.keys(moodActivities).map((mood) => (
            <button
              key={mood}
              style={{
                ...buttonStyle,
                backgroundColor: moodColors[mood],
                color: "#fff",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
            </button>
          ))}
        </>
      ) : (
        <>
          <h2 style={{ fontSize: "2rem" }}>You are feeling {selectedMood}</h2>
          <h3 style={{ marginBottom: 20 }}>⭐ Total Points: {totalScore}</h3>
          <p style={{ fontSize: "1.2rem", marginBottom: 20 }}>Choose an activity to match your mood:</p>
          {moodActivities[selectedMood].map((game, index) => (
            <button
              key={index}
              style={gameButtonStyle}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => setSelectedGame(game)}
            >
              {game.name}
            </button>
          ))}
          <br />
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#ccc",
              color: "#333",
              fontSize: 14,
            }}
            onClick={() => setSelectedMood(null)}
          >
            Back to Mood Selection
          </button>
        </>
      )}
    </div>
  );
}
