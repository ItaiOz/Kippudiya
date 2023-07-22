import React from "react";
import "./style/index.scss";
import { MainMenu } from "./components/MainMenu";
import { GameZone } from "./components/GameZone";
import { PlayersRoster } from "./components/PlayerRoster";
import { Leaderboard } from "./components/Leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FooterNavigation } from "./components/Footer";
import { Header } from "./components/Header";
import { HOCLoader } from "./common/HOCLoader/HOCLoader";
import { PostGame } from "./components/GameZone/PostGame";
import { History } from "./components/History";

function App() {
  return (
    <div className="App">
      <HOCLoader>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game-zone" element={<GameZone />} />
            <Route path="/history" element={<History />} />
            <Route path="/players-roster" element={<PlayersRoster />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/post-game" element={<PostGame />} />
          </Routes>
          <FooterNavigation />
        </BrowserRouter>
      </HOCLoader>
    </div>
  );
}

export default App;
