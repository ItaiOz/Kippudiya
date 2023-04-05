import React from "react";
import "./style.scss";
import HedgeIcon from "../../assets/hedgehog.png";

interface Props {
  userName: string;
}
export const Header = ({ userName }: Props) => {
  return (
    <div className="header">
      <div className="header-left">
        <img className="header-icon" src={HedgeIcon} alt="icon" />
        <h1 className="game-header">Hakippudiya</h1>
      </div>
      <div className="header-right">
        <span className="header-greeting">Hello, {userName}</span>
      </div>
    </div>
  );
};
