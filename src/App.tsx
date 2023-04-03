import React from "react";
import { MainMenu } from "./MainMenu";
import { GameZone } from "./GameZone/GameZone";
import { PlayersRoster } from "./PlayersRoster";
import { Leaderboard } from "./Leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FooterNavigation } from "./UI/Footer";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className="game-header">Hakippudiya</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game-zone" element={<GameZone />} />
          <Route path="/players-roster" element={<PlayersRoster />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <FooterNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
