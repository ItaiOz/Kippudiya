import React from "react";
import { useNavigate } from "react-router-dom";

export const Leaderboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/post-game");
  };

  return (
    <>
      <div>Leader board will be here</div>
      <button onClick={handleClick}>here</button>
    </>
  );
};
