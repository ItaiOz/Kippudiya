import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import BlackHeart from '../../assets/heartBlack.png';
import RedHeart from '../../assets/heartRed.png';

export const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="main-menu-container">
      <div className="card-wrapper">
        <div className="custom-card-button" onClick={() => navigate("/game-zone")}>
           <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
          <div className="custom-card-label">
            Start Game
          </div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
        </div>
        <div className="custom-card-button" onClick={() => navigate("/players-roster")}>
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
          <div className="custom-card-label">
            Players Roster
          </div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
        </div>
        <div className="custom-card-button" onClick={() => navigate("/game-zone")}>
          <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
          <div className="custom-card-label">
            Poker Calculator
          </div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
        </div>
        <div className="custom-card-button" onClick={() => navigate("/game-zone")}>
        <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
          <div className="custom-card-label">
            House Rules
          </div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={BlackHeart} alt="icon" />
          </div>
        </div>
        <div className="custom-card-button" onClick={() => navigate("/game-zone")}>
        <div className="custom-card-symbol__upper">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
          <div className="custom-card-label">
            What To Order?
          </div>
          <div className="custom-card-symbol__lower">
            <img className="card-symbol" src={RedHeart} alt="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

    {/* <Button
      className="btn"
      variant="contained"
      onClick={() => navigate("/game-zone")}
    >
      Start Game
    </Button>
    <Button
      className="btn"
      variant="contained"
      onClick={() => navigate("players-roster")}
    >
      PLayers Roster
    </Button>

    <Button className="btn" variant="contained">
      Poker Calculator
    </Button>
    <Button className="btn" variant="contained">
      LeaderBoard
    </Button>
    <Button className="btn" variant="contained">
      House Rules
    </Button>
    <Button className="btn" variant="contained">
      What To Order?
    </Button> */}