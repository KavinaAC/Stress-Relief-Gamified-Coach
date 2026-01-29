import React, { useState, useEffect } from "react";

export function QuickMath({ onComplete }) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [qCount, setQCount] = useState(0);
  const totalQuestions = 5;

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setQuestion({ a, b, op: "+" });
    setAnswer("");
  };

  const checkAnswer = () => {
    let newScore = score;
    if (+answer === question.a + question.b) {
      newScore++;
      setScore(newScore);
    }
    if (qCount + 1 >= totalQuestions) {
      onComplete(newScore);
    } else {
      setQCount(qCount + 1);
      generateQuestion();
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        width: "280px",
        margin: "auto",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
      }}
    >
      <h2 style={{ color: "#ff6347", marginBottom: "10px" }}>🧮 Quick Math Challenge!</h2>
      <p style={{ fontSize: "14px", color: "#444" }}>
        Solve <b>{totalQuestions}</b> questions as fast as you can!
      </p>

      <div
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          margin: "15px 0",
          fontSize: "20px",
          fontWeight: "bold",
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        ❓ What is {question.a} + {question.b}?
      </div>

      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
        autoFocus
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "2px solid #ff7f50",
          outline: "none",
          width: "60px",
          textAlign: "center",
          fontSize: "16px",
          marginRight: "5px",
        }}
      />
      <button
        onClick={checkAnswer}
        style={{
          padding: "8px 14px",
          background: "#ff7f50",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#ff6347")}
        onMouseOut={(e) => (e.target.style.background = "#ff7f50")}
      >
        ✅ Submit
      </button>

      <p style={{ marginTop: "15px", fontSize: "16px", color: "#444" }}>
        Score: <b>{score}</b> | Question {qCount + 1}/{totalQuestions}
      </p>
    </div>
  );
}
