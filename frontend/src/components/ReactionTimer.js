import React, { useState, useEffect } from "react";

export function ReactionTimer({ onComplete }) {
  const [status, setStatus] = useState("waiting"); // waiting, ready, click, done
  const [message, setMessage] = useState("Click anywhere to start!");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [score, setScore] = useState(0); // ✅ Added score

  useEffect(() => {
    let timeout;
    if (status === "ready") {
      timeout = setTimeout(() => {
        setStatus("click");
        setMessage("🌟 CLICK NOW! 🌟");
        setStartTime(Date.now());
      }, Math.random() * 3000 + 2000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const handleClick = () => {
    if (score >= 10) {
      setMessage("🏆 You won! Final score: 10");
      return;
    }

    if (status === "waiting") {
      setStatus("ready");
      setMessage("⏳ Wait for GREEN...");
      setReactionTime(null);
    } else if (status === "click") {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      setMessage(`⚡ Your reaction time: ${rt} ms`);
      setStatus("done");
      setScore(prev => Math.min(prev + 1, 10)); // ✅ Add score but max 10
      onComplete(10);
    } else if (status === "ready") {
      setMessage("❌ Too early! Click to try again.");
      setStatus("waiting");
    } else if (status === "done") {
      setStatus("waiting");
      setMessage("Click anywhere to start!");
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor:
          status === "click"
            ? "#28a745"
            : status === "ready"
            ? "#ffc107"
            : "#dc3545",
        color: "white",
        padding: "80px 20px",
        borderRadius: "20px",
        cursor: "pointer",
        userSelect: "none",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s ease",
      }}
    >
      <h2 style={{ marginBottom: "10px", fontSize: "28px" }}>{message}</h2>
      {reactionTime && (
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          🎯 Try again to beat your score!
        </p>
      )}
      <p style={{ fontSize: "18px", marginTop: "15px" }}>
        📊 Score: {score} / 10
      </p>
      <p style={{ marginTop: "20px", fontSize: "16px", opacity: 0.8 }}>
        💡 Instructions: Click to start, wait until the screen turns green, then click as fast as you can!
      </p>
    </div>
  );
}
