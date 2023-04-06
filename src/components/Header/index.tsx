import React, { useEffect } from "react";
import "./style.scss";

export const Header: React.FC<any> = () => {
  const name = localStorage.getItem("userName");

  const handleStorageChange = (e: any) => {
    if (e.key === "userName") {
      const name = localStorage.getItem("userName");
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="header">
      <h1 className="game-header">Hakippudiya</h1>
      <h5 className="user-title">Hello, {name ? name : "guest"}</h5>
    </div>
  );
};
