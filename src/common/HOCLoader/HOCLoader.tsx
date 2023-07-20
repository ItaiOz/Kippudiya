import React, { ReactNode } from "react";
import "./style.scss";
import { useGameStore } from "../../store/gameStore";
import spinner from "../../assets/spinning-circles.svg";
interface Props {
  children: ReactNode;
}

export const HOCLoader: React.FC<Props> = (props) => {
  const isLoading = useGameStore((state: any) => state.isLoading);

  return (
    <>
      {props.children}
      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader">
            <img src={spinner}></img>
          </div>
        </div>
      )}
    </>
  );
};
