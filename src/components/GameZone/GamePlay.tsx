import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { FiRefreshCw } from "react-icons/fi";
import { AlertDialog } from "../../common/Modal/Modal";
import Button from "@mui/material/Button";
import { useGameStore } from "../../store/gameStore";
import { ApiLoader } from "../../common/ApiLoader";
import { useSupabaseRequests } from "../../hooks/useSupabaseRequests";

export const GamePlay: React.FC<any> = () => {
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);

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
    isLoading,
    isKipudModalOpen,
    isAddPlayerModalOpen,
  } = useSupabaseRequests();

  const players = useGameStore((state: any) => state.players);

  console.log(playersBalance);

  useEffect(() => {
    retrieveGameData();
  }, [toggleRefresh]);

  if (isLoading) {
    return <ApiLoader />;
  }

  const renderKipudModal = () => {
    return (
      <AlertDialog
        isOpen={isKipudModalOpen}
        onApprove={onKipudConfirm}
        onClose={() => setIsKipudModalOpen(false)}
        isDisabled={Object.keys(balanceChanges).length === 0}
      >
        {balanceChanges && (
          <>
            {Object.keys(balanceChanges).length > 0 ? (
              <p>These Following changes will be made</p>
            ) : (
              <p>No changes have been made so far</p>
            )}
            {Object.entries(balanceChanges).map(
              ([key, value]: any, index: number) => (
                <div className="players-changes" key={index}>
                  <span>{key}</span>
                  <span>{value > 0 ? `+${value}` : value}</span>
                </div>
              )
            )}
          </>
        )}
      </AlertDialog>
    );
  };

  const renderAddPlayerModal = () => {
    return (
      <AlertDialog
        isOpen={isAddPlayerModalOpen}
        onApprove={() => onAddPlayer()}
        onClose={() => setIsAddPlayerModalOpen(false)}
      >
        <p>Select a new player to join the game</p>
        <select
          className="players-options"
          onChange={(e) => setSelectedNewPlayer(e.target.value)}
          value={selectedNewPlayer}
        >
          <option>Select...</option>
          {players.map((player: any, index: number) => (
            <option key={index}>{player}</option>
          ))}
        </select>
      </AlertDialog>
    );
  };

  const renderEndGameModal = () => {
    return (
      <AlertDialog
        isOpen={isEndGameModalOpen}
        onApprove={() => onEndGame()}
        onClose={() => setIsEndGameModalOpen(false)}
      >
        <p>Are you sure you want to end the game?</p>
      </AlertDialog>
    );
  };

  if (isLoading) return <ApiLoader />;

  return (
    <>
      <div className="game-play-title">
        <span>Game is in progress</span>
        <span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </div>
      <div className="players-balance">
        {Object.entries(playersBalance).map(([player, balance]: any, index) => (
          <Player
            toggle={toggleRefresh}
            player={player}
            playerBalance={balance}
            key={index}
            onBalanceChange={onPlayerBalanceChange}
          />
        ))}
      </div>
      <div className="actions-buttons-block">
        <Button
          size={"small"}
          className="refresh-button"
          variant="contained"
          onClick={() => setToggleRefresh(!toggleRefresh)}
        >
          <FiRefreshCw />
        </Button>
        <Button
          size={"small"}
          className="button btn"
          variant="contained"
          onClick={handleKipud}
        >
          Kaped
        </Button>
        <Button
          size={"small"}
          className="add-player-btn"
          variant="contained"
          onClick={() => setIsAddPlayerModalOpen(true)}
        >
          Add New Player
        </Button>
      </div>
      <Button
        size={"small"}
        variant="contained"
        onClick={() => setIsEndGameModalOpen(true)}
      >
        End Game
      </Button>
      {renderKipudModal()}
      {renderAddPlayerModal()}
      {renderEndGameModal()}
    </>
  );
};
