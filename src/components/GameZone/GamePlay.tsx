import React, { useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { useSupabaseRequests } from "../../hooks/useSupabaseRequests";
import {
  renderKipudModal,
  renderAddPlayerModal,
  renderEndGameModal,
} from "./utils";
import { UpperActionButtons } from "./ActionButtons/UpperActionButtons";
import { InputModal } from "../../common/Modal/InputModal";
import { Player } from "./Player";
import "./style.scss";

export const GamePlay: React.FC<any> = () => {
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const userName = localStorage.getItem("userName");
  const onMekapedLogged = useGameStore((state) => state.onMekapedLogged);

  const {
    retrieveGameData,
    onPlayerBalanceChange,
    handleKipud,
    onKipudConfirm,
    setIsKipudModalOpen,
    onAddPlayer,
    setIsAddPlayerModalOpen,
    setSelectedNewPlayer,
    onEndGame,
    selectedNewPlayer,
    balanceChanges,
    playersBalance,
    isKipudModalOpen,
    isAddPlayerModalOpen,
  } = useSupabaseRequests();

  const players = useGameStore((state: any) => state.players);

  const renderUserModal = () => {
    return (
      <InputModal
        isOpen={isUserModalOpen}
        onCloseModal={() => setIsUserModalOpen(false)}
        onInputInserted={(name: string) => {
          localStorage.setItem("userName", name);
          onMekapedLogged(name);
          setIsUserModalOpen(false);
        }}
      />
    );
  };

  useEffect(() => {
    retrieveGameData();
  }, [toggleRefresh]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Refresh the page when user leaves the page
      window.location.reload();
    };

    window.addEventListener("visibilitychange", handleBeforeUnload);

    return () => {
      window.removeEventListener("visibilitychange", handleBeforeUnload);
    };
  }, []);

  const shareToWhatsApp = () => {
    let text = "";

    Object.entries(playersBalance).map(([name, balance]) => {
      text = text + `${name} ${balance}\n`;
    });

    const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  return (
    <>
      <div className="game-play-title">
        <span>Game is in progress</span>
        <span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </div>
      <UpperActionButtons
        onToggleRefresh={() => setToggleRefresh(!toggleRefresh)}
        onWhatsappShare={shareToWhatsApp}
      />
      <div className="players-balance">
        {Object.entries(playersBalance).map(([player, balance]: any, index) => (
          <Player
            key={index}
            player={player}
            balance={balance}
            onBalanceChange={onPlayerBalanceChange}
          />
        ))}
      </div>
      <div className="actions-buttons-block">
        <button
          className="action-button btn"
          onClick={() => (userName ? handleKipud() : setIsUserModalOpen(true))}
        >
          Kaped
        </button>
        <button
          className="action-button btn"
          onClick={() =>
            userName ? setIsAddPlayerModalOpen(true) : setIsUserModalOpen(true)
          }
        >
          Add New Player
        </button>
        <button
          className="action-button btn"
          onClick={() =>
            userName ? setIsEndGameModalOpen(true) : setIsUserModalOpen(true)
          }
        >
          End Game
        </button>
      </div>
      {renderUserModal()}
      {renderKipudModal(
        isKipudModalOpen,
        onKipudConfirm,
        setIsKipudModalOpen,
        balanceChanges
      )}
      {renderAddPlayerModal(
        isAddPlayerModalOpen,
        onAddPlayer,
        setIsAddPlayerModalOpen,
        setSelectedNewPlayer,
        playersBalance,
        players,
        selectedNewPlayer
      )}
      {renderEndGameModal(isEndGameModalOpen, onEndGame, setIsEndGameModalOpen)}
    </>
  );
};
