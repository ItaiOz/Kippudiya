import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import BlackHeart from "../../assets/heartBlack.png";
import RedHeart from "../../assets/heartRed.png";

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
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
          <div className="custom-card-label">Start Game</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
        </div>
        <div
          className="custom-card-button"
          onClick={() => navigate("/players-roster")}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
          <div className="custom-card-label">Players Roster</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
        </div>
        <div
          className="custom-card-button"
          onClick={() => navigateToExternalLink()}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
          <div className="custom-card-label">Poker Calculator</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
        </div>
        <div
          className="custom-card-button"
          onClick={() => navigate("/game-zone")}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
          <div className="custom-card-label">House Rules</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
        </div>
        {/* <div
          className="custom-card-button"
          onClick={() => navigate("/game-zone")}
        >
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
          <div className="custom-card-label">What To Order?</div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
        </div> */}
      </div>
    </div>
  );
};
