import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { FiRefreshCw } from "react-icons/fi";
import { AlertDialog } from "../../UI/Modal/Modal";
import { useGameStore } from "../../store/gameStore";
import Button from "@mui/material/Button";

export const GamePlay: React.FC<any> = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const players = useGameStore((state) => state.players);

  const onModalConfirm = () => {
    setIsModalOpen(false);
  };

  const renderModal = () => {
    return (
      <AlertDialog
        buttonTitle="surrre"
        modalContent="Are you sure you want to Lekaped?"
        onConfirm={() => onModalConfirm()}
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      />
    );
  };

  useEffect(() => {
    console.log(players);
  }, []);

  return (
    <>
      <div className="players-balance">
        {players.map((player, index) => (
          <Player player={player} key={index} />
        ))}
      </div>
      <div
        className="actions-buttons-block"
        onClick={() => setRenderCount(renderCount + 1)}
      >
        <Button
          color={"primary"}
          size={"small"}
          className="refresh-button"
          variant="contained"
        >
          <FiRefreshCw />
        </Button>
        <Button
          color={"success"}
          size={"small"}
          className="button"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Kaped
        </Button>
        {renderModal()}
      </div>
    </>
  );
};
