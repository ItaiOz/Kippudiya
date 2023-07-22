import React, { useEffect } from "react";
import "./style.scss";
import { useGameStore } from "../../store/gameStore";

export const Header: React.FC<any> = () => {
  const name = useGameStore((state: any) => state.mekaped);

  return (
    <div className="header">
      <h1 className="game-header">Hakippudiya</h1>
      <h5 className="user-title">Hello, {name ? name : "guest"}</h5>
    </div>
  );
};
