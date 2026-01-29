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
        background: "linear-gradient(135deg, #f9d423, #ff4e50)",
        padding: "30px 25px",
        borderRadius: "20px",
        color: "#fff",
        textAlign: "center",
        maxWidth: "420px",
        margin: "50px auto",
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        fontFamily: "'Poppins', sans-serif",
        animation: "fadeIn 0.6s ease-in-out",
      }}
    >
      <p
        style={{
          fontStyle: "italic",
          fontSize: "1.5rem",
          lineHeight: "1.6",
          marginBottom: "25px",
          letterSpacing: "0.5px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          animation: "fadeText 0.7s ease-in-out",
        }}
      >
        {affirmations[index]}
      </p>
      <button
        onClick={next}
        style={{
          backgroundColor: "#fff",
          color: "#ff4e50",
          border: "none",
          borderRadius: "30px",
          padding: "12px 28px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
          transition: "all 0.4s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#ff4e50";
          e.target.style.color = "#fff";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#fff";
          e.target.style.color = "#ff4e50";
          e.target.style.transform = "scale(1)";
        }}
      >
        Next 💖
      </button>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
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
