import React from "react";
import { MainMenu } from "./MainMenu";
import { GameZone } from "./GameZone";
import { PlayersRoster } from "./PlayersRoster";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SimpleBottomNavigation from "./UI/Modal/Navigation";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Hakippudiya</h1>
      </div>
      <BrowserRouter>
        <SimpleBottomNavigation />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game-zone" element={<GameZone />} />
          <Route path="/players-roster" element={<PlayersRoster />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
