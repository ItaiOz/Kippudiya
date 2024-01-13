import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Spade from "../../assets/spade.png";
import Club from "../../assets/clubs.png";
import Diamond from "../../assets/diamond.png";
import Heart from "../../assets/heartRed.png";

export const MainMenu = () => {
  const navigate = useNavigate();

  const externalUrl =
    "https://www.cardplayer.com/poker-tools/odds-calculator/texas-holdem";

  const navigateToExternalLink = () => {
    window.location.href = externalUrl;
  };

  return (
    <div className="main-menu-container">
      <div className="card-wrapper">
        <div
          className="custom-card-button"
          onClick={() => navigate("/game-zone")}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={Heart} alt="icon" />
          </div>
          <div className="custom-card-label">Start Game</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={Heart} alt="icon" />
          </div>
        </div>
        <div
          className="custom-card-button"
          onClick={() => navigate("/players-roster")}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={Club} alt="icon" />
          </div>
          <div className="custom-card-label">Players Roster</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={Club} alt="icon" />
          </div>
        </div>
        <div
          className="custom-card-button"
          onClick={() => navigateToExternalLink()}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={Diamond} alt="icon" />
          </div>
          <div className="custom-card-label">Poker Calculator</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={Diamond} alt="icon" />
          </div>
        </div>
        <div
          className="custom-card-button"
          onClick={() => navigate("/game-zone")}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={Spade} alt="icon" />
          </div>
          <div className="custom-card-label">What to order</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={Spade} alt="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
