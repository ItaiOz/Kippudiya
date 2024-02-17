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
import { ErrorPage } from "./common/ErrorPage";
import { GameHistory } from "./components/History/GameHistory";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="App">
      <HOCLoader>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/game-zone" element={<GameZone />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/:gameId" element={<GameHistory />} />
              <Route path="/players-roster" element={<PlayersRoster />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/post-game" element={<PostGame />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <FooterNavigation />
          </BrowserRouter>
        </ErrorBoundary>
      </HOCLoader>
    </div>
  );
}

export default App;
