import React, { useState } from "react";

export function SimonSays({ onComplete }) {
  const colors = ["red", "blue", "green", "yellow"];
  const [sequence, setSequence] = useState([]);
  const [playerSeq, setPlayerSeq] = useState([]);
  const [message, setMessage] = useState("Click Start to play");
  const [activeColor, setActiveColor] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  const startGame = () => {
    const newSeq = [colors[Math.floor(Math.random() * 4)]];
    setSequence(newSeq);
    setPlayerSeq([]);
    setMessage("Watch the pattern...");
    playSequence(newSeq);
  };

  const playSequence = (seq) => {
    setIsPlayerTurn(false);
    let i = 0;

    const interval = setInterval(() => {
      setActiveColor(seq[i]);
      setTimeout(() => setActiveColor(null), 500); // remove highlight after 0.5s
      i++;

      if (i >= seq.length) {
        clearInterval(interval);
        setTimeout(() => {
          setMessage("Your turn! Repeat the pattern.");
          setIsPlayerTurn(true);
        }, 500);
      }
    }, 1000);
  };

  const handleClick = (color) => {
    if (!isPlayerTurn) return;

    const newPlayerSeq = [...playerSeq, color];
    setPlayerSeq(newPlayerSeq);

    // Player got full sequence right
    if (newPlayerSeq.join(",") === sequence.join(",")) {
      setMessage("Good job! Next round...");
      setTimeout(() => {
        const nextSeq = [...sequence, colors[Math.floor(Math.random() * 4)]];
        setSequence(nextSeq);
        setPlayerSeq([]);
        setMessage("Watch the pattern...");
        playSequence(nextSeq);
      }, 1000);
    } 
    // Player made a mistake
    else if (
      !sequence.slice(0, newPlayerSeq.length).every((c, i) => c === newPlayerSeq[i])
    ) {
      setMessage("Oops! Wrong color. Game Over.");
      setTimeout(() => {
        if (onComplete) onComplete(); // ✅ notify parent
      }, 1000);
    }
  };

  return (
    <div style={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>
      <h2>Simon Says</h2>

      {/* Instructions */}
      <div style={{
        background: "#f4f4f4",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
        textAlign: "left"
      }}>
        <h4>How to Play:</h4>
        <ol style={{ marginLeft: "20px" }}>
          <li>Click <b>Start</b> to begin.</li>
          <li>Watch the colors light up.</li>
          <li>Repeat the sequence exactly.</li>
          <li>Each round adds a new color.</li>
          <li>One wrong click ends the game!</li>
        </ol>
      </div>

      <button onClick={startGame}>Start</button>

      <div style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        gap: 10
      }}>
        {colors.map((c) => (
          <button
            key={c}
            style={{
              background: c,
              height: 50,
              width: 50,
              border: activeColor === c ? "5px solid white" : "2px solid black",
              opacity: activeColor === c ? 1 : 0.6,
              transition: "opacity 0.3s, border 0.3s"
            }}
            onClick={() => handleClick(c)}
          />
        ))}
      </div>

      <p style={{ marginTop: 10, fontWeight: "bold" }}>{message}</p>
    </div>
  );
}
