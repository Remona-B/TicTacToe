"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = calculateWinner(board);
  const isTie = !winner && board.every((cell) => cell !== null);

  const audioRef = useRef(null);
  useEffect(() => {
    const tryPlay = async () => {
      try {
        audioRef.current.loop = true;
        await audioRef.current.play();
      } catch {}
    };
    tryPlay();
  }, []);

  function handleClick(index) {
    if (board[index] || winner || isTie) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#FCF9EA] p-4">
      {winner && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 0}
          height={typeof window !== "undefined" ? window.innerHeight : 0}
          numberOfPieces={120}
          gravity={0.2}
        />
      )}

      <audio ref={audioRef} src="/audio/avacado.mp3" preload="auto" />

      <h1
        className="text-5xl sm:text-6xl font-bold mb-4 text-center"
        style={{ color: "#B87C4C", fontFamily: "Starbim, sans-serif" }}
      >
        Tic Tac Toe
      </h1>

      <p className="text-xl sm:text-2xl font-medium mb-8 text-black text-center">
        {winner ? (
          <span className="text-3xl font-bold" style={{ color: "#B87C4C" }}>
            Winner: {winner}
          </span>
        ) : isTie ? (
          <span className="text-3xl font-bold" style={{ color: "#B87C4C" }}>
            It’s a Tie!
          </span>
        ) : (
          <>
            Current Turn:{" "}
            <span className="font-bold">{isXTurn ? "X" : "O"}</span>
          </>
        )}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center transition transform active:scale-95"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 12px 30px rgba(184,124,76,0.18)",
            }}
          >
            <span
              className="text-5xl font-bold sm:text-6xl"
              style={{
                color:
                  value === "X"
                    ? "#BADFDB"
                    : value === "O"
                    ? "#D97D55"
                    : "#222",
                textShadow: "0 4px 12px rgba(184,124,76,0.25)",
              }}
            >
              {value}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-8 sm:px-10 py-3 rounded-full text-lg sm:text-xl font-medium transition transform active:scale-95"
        style={{
          background: "#FFFFFF",
          color: "#F7A5A5",
          boxShadow: "0 8px 25px rgba(184,124,76,0.2)",
        }}
      >
        Reset Game
      </button>
    </main>
  );
}

function calculateWinner(board) {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of combos) {
    if (board[a] && board[a] === board[b] && board[b] === board[c])
      return board[a];
  }
  return null;
}
