import React from "react";
import "./style.scss";
import ReactDOM from "react-dom";

export const ApiLoader = () => {
  const loaderStyles = {};

  const loader = (
    <div className="api-loader">
      <div className="loader"></div>
    </div>
  );

  return ReactDOM.createPortal(loader, document.body);
};
