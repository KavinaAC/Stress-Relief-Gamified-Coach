import React, { useState, useEffect } from "react";

const cards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓"];

export function MemoryMatch({ onComplete }) {
  const [shuffled, setShuffled] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    setShuffled([...cards].sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (i) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (shuffled[a] === shuffled[b]) {
        setTimeout(() => {
          setMatched((m) => {
            const updated = [...m, a, b];
            if (updated.length === shuffled.length) onComplete();
            return updated;
          });
          setFlipped([]);
        }, 800);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#ff6f61", marginBottom: "5px" }}>🧠 Memory Match</h2>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "15px" }}>
        Flip two cards to find the matching fruit! Try to match them all! 🍎🍌🍇🍓
      </p>
      <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
        Matches Found: {matched.length / 2} / {cards.length / 2}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 70px)",
          gap: 15,
          justifyContent: "center",
        }}
      >
        {shuffled.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          return (
            <div
              key={i}
              onClick={() => flipCard(i)}
              style={{
                width: 70,
                height: 70,
                backgroundColor: isFlipped ? "#fff7e6" : "#ffcccb",
                color: isFlipped ? "#000" : "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                borderRadius: 10,
                cursor: "pointer",
                userSelect: "none",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, background-color 0.3s",
                transform: isFlipped ? "scale(1.05)" : "scale(1)",
              }}
            >
              {isFlipped ? card : "❓"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
