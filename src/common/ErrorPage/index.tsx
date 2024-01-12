import React from "react";
import errorChip from "../../assets/sad-chip.png";
import "./style.scss";

export const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1>OOPS!</h1>
      <img src={errorChip} height={200} width={200} alt="error" />
      <h3>An error has occured, plesae try again later</h3>
    </div>
  );
};
