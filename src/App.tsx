import React from "react";
import { MainMenu } from "./components/MainMenu";
import { GameZone } from "./components/GameZone";
import { PlayersRoster } from "./components/PlayerRoster";
import { Leaderboard } from "./components/Leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FooterNavigation } from "./components/Footer";

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
