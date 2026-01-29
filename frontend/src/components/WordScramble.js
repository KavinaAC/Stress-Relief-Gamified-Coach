import React, { useState } from "react";

const words = ["peace", "calm", "happy", "relax", "focus"];

export function WordScramble({ onComplete }) {
  const [word, setWord] = useState(randomWord());
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  function randomWord() {
    const w = words[Math.floor(Math.random() * words.length)];
    return {
      original: w,
      scrambled: w.split("").sort(() => Math.random() - 0.5).join(""),
    };
  }

  const checkAnswer = () => {
    if (input.toLowerCase() === word.original) {
      setGameOver(true);
      setMessage("✅ Correct! +10 points");
      onComplete(10); // Pass points to parent
    } else {
      setMessage("❌ Try again!");
    }
  };

  const resetGame = () => {
    setWord(randomWord());
    setInput("");
    setMessage("");
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>🎯 You unscrambled it!</h2>
        <p>{message}</p>
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            margin: 10,
            borderRadius: 8,
            backgroundColor: "#4dabf7",
            color: "#fff",
            cursor: "pointer",
            border: "none",
          }}
        >
          Play Again
        </button>
        <button
          onClick={() => onComplete(0)} // Return to parent menu
          style={{
            padding: "10px 20px",
            margin: 10,
            borderRadius: 8,
            backgroundColor: "#ccc",
            color: "#333",
            cursor: "pointer",
            border: "none",
          }}
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: "1.5rem" }}>Unscramble this word:</h3>
      <h2 style={{ fontSize: "2rem", letterSpacing: 3 }}>{word.scrambled}</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "8px 12px",
          fontSize: "1rem",
          borderRadius: 5,
          border: "1px solid #ccc",
          marginTop: 10,
        }}
        placeholder="Type your answer"
      />
      <br />
      <button
        onClick={checkAnswer}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          borderRadius: 8,
          backgroundColor: "#ffd93d",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Check
      </button>
      <p style={{ marginTop: 10, fontWeight: "bold", color: "#ff6b6b" }}>{message}</p>
    </div>
  );
}
