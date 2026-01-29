import React, { useState } from "react";

export function NumberPuzzle() {
  const [tiles, setTiles] = useState(shuffle([...Array(9).keys()]));

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];

    // Ensure the move is valid and within grid boundaries
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [
        newTiles[index],
        newTiles[emptyIndex],
      ];
      setTiles(newTiles);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧩 Number Puzzle</h2>
      <p style={styles.instructions}>
        Arrange the tiles in order (1 to 8) with the empty space at the end.
        <br />
        Click on a tile next to the empty space to move it.
      </p>

      <div style={styles.grid}>
        {tiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(index)}
            style={{
              ...styles.tile,
              background: tile === 0 ? "#f1f1f1" : "linear-gradient(135deg, #4cafef, #007bb5)",
              color: tile === 0 ? "transparent" : "#fff",
              cursor: tile === 0 ? "default" : "pointer",
              boxShadow: tile === 0 ? "none" : "0px 4px 6px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              if (tile !== 0) {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0px 6px 10px rgba(0,0,0,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = tile === 0 ? "none" : "0px 4px 6px rgba(0,0,0,0.2)";
            }}
          >
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    background: "#f7faff",
    borderRadius: "10px",
    width: "max-content",
    margin: "auto",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
  },
  title: {
    color: "#333",
    marginBottom: "10px",
  },
  instructions: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
    background: "#e8f4fc",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #cde8f5",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: "8px",
  },
  tile: {
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
  },
};
