import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FOOTER_CONFIG,
  FooterIconDictionary,
  FooterItem,
} from "./footer.config";

export const FooterNavigation: React.FC<any> = () => {
  const [activeButton, setActiveButton] = useState(0);

  const navigate = useNavigate();

  const handleClick = (buttonId: number) => {
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
      case 5:
        navigate("/game-zone");
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
