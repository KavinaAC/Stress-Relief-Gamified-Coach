import React, { useState } from "react";

const affirmations = [
  "🌟 I am capable of amazing things.",
  "😊 I choose to be happy today.",
  "🌈 Every day is a new opportunity.",
  "💪 I am proud of how far I’ve come.",
  "💖 I deserve good things.",
  "✨ I am glowing with positive energy.",
  "🌻 I attract joy and abundance into my life."
];

export function AffirmationQuiz({ onComplete }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index + 1 >= affirmations.length) {
      onComplete();
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #b11226, #e63946)",
        padding: "32px 26px",
        borderRadius: "22px",
        color: "#ffffff",
        textAlign: "center",
        maxWidth: "420px",
        margin: "50px auto",
        boxShadow: "0 14px 35px rgba(177, 18, 38, 0.35)",
        fontFamily: "'Poppins', sans-serif",
        animation: "fadeIn 0.6s ease-in-out",
      }}
    >
      <p
        style={{
          fontStyle: "italic",
          fontSize: "1.55rem",
          lineHeight: "1.6",
          marginBottom: "28px",
          letterSpacing: "0.6px",
          textShadow: "1px 2px 4px rgba(0,0,0,0.35)",
          animation: "fadeText 0.7s ease-in-out",
        }}
      >
        {affirmations[index]}
      </p>

      <button
        onClick={next}
        style={{
          backgroundColor: "#ffffff",
          color: "#b11226",
          border: "2px solid #ffffff",
          borderRadius: "32px",
          padding: "12px 30px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
          transition: "all 0.35s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#b11226";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "scale(1.07)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.color = "#b11226";
          e.target.style.transform = "scale(1)";
        }}
      >
        Next ❤️
      </button>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeText {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
