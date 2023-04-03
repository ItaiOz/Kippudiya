import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FaCards from "react-icons/fa";
import {
  FOOTER_CONFIG,
  FooterIconDictionary,
  FooterItem,
} from "./footer.config";

export const FooterNavigation: React.FC<any> = () => {
  const [value, setValue] = useState(0);
  const [activeButton, setActiveButton] = useState(0);

  const navigate = useNavigate();

  const style = {
    backgroundColor: "#2c2c2e",
    color: "#b5b5b5",
    maxWidth: "45px",
    fontSize: "12px",
  };

  const buttonContainerStyle = {
    backgroundColor: "#2c2c2e",
    color: "#b5b5b5",
  };

  const handleClick = (buttonId: number) => {
    console.log(buttonId);
    setActiveButton(buttonId);

    switch (buttonId) {
      case 1:
        navigate("/");
        break;
      case 2:
        break;
      case 3:
        navigate("/leaderboard");
        break;
      case 4:
        navigate("/players-roster");
        break;
    }
  };

  return (
    <div className="footer sticky-footer">
      {FOOTER_CONFIG.map((item: FooterItem, index: number) => {
        const { imageKey, label } = item;
        return (
          <button
            onClick={() => handleClick(index + 1)}
            key={imageKey}
            className="footer-button"
          >
            <div
              className={`icon ${activeButton === index + 1 ? "active" : ""}`}
            >
              {FooterIconDictionary[imageKey]}
            </div>
            <span
              className={`label nav-label ${
                activeButton === index + 1 ? "active" : ""
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
