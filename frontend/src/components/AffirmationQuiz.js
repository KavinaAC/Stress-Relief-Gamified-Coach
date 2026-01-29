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
        padding: "20px",
        borderRadius: "15px",
        color: "white",
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        animation: "fadeIn 0.5s ease-in-out"
      }}
    >
      <p
        style={{
          fontStyle: "italic",
          fontSize: "1.4rem",
          lineHeight: "1.5",
          marginBottom: "20px",
          animation: "fadeText 0.6s ease-in-out"
        }}
      >
        {affirmations[index]}
      </p>
      <button
        onClick={next}
        style={{
          backgroundColor: "#fff",
          color: "#ff4e50",
          border: "2px solid white",
          borderRadius: "25px",
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#ff4e50";
          e.target.style.color = "white";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#ff4e50";
        }}
      >
        Next 💖
      </button>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeText {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
