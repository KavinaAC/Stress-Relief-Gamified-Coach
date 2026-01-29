import React, { useState, useEffect } from "react";

export function BreathingExercise({ onComplete }) {
  const [phase, setPhase] = useState("inhale");
  const [timer, setTimer] = useState(4);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (round >= 4) {
      onComplete();
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t === 1) {
          setPhase((p) => (p === "inhale" ? "exhale" : "inhale"));
          if (phase === "exhale") setRound((r) => r + 1);
          return 4;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, phase, round, onComplete]);

  return (
    <div
      style={{
        background: phase === "inhale"
          ? "linear-gradient(135deg, #a1c4fd, #c2e9fb)"
          : "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
        padding: "25px",
        borderRadius: "20px",
        color: "#333",
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        transition: "background 0.8s ease-in-out",
      }}
    >
      <h3
        style={{
          fontSize: "1.8rem",
          marginBottom: "10px",
          animation: "fadeText 0.6s ease-in-out",
        }}
      >
        {phase === "inhale" ? "🌬️ Breathe In" : "🍃 Breathe Out"}
      </h3>

      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "10px 0",
          animation: "pulse 1s infinite",
        }}
      >
        {timer}s
      </div>

      <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
        Round: {round + 1} / 4
      </p>

      <p style={{ fontSize: "0.9rem", fontStyle: "italic", color: "#555" }}>
        {phase === "inhale"
          ? "Fill your lungs with fresh air..."
          : "Release and feel the tension melt away..."}
      </p>

      <style>
        {`
          @keyframes fadeText {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
