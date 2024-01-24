import React from "react";
import { AlertDialog } from "../../common/Modal/Modal";

export const renderKipudModal = (
  isKipudModalOpen: boolean,
  onKipudConfirm: any,
  setIsKipudModalOpen: any,
  balanceChanges: any
) => {
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

export const renderAddPlayerModal = (
  isAddPlayerModalOpen: boolean,
  onAddPlayer: any,
  setIsAddPlayerModalOpen: any,
  setSelectedNewPlayer: any,
  playersBalance: any,
  players: any,
  selectedNewPlayer: string
) => {
  const currentPlayers = Object.keys(playersBalance).map(
    (player: string) => player
  );

  const filteredArray = players.filter(
    (element: string) => !currentPlayers.includes(element)
  );

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
        {filteredArray.map((player: any, index: number) => (
          <option key={index}>{player}</option>
        ))}
      </select>
    </AlertDialog>
  );
};

export const renderEndGameModal = (
  isEndGameModalOpen: boolean,
  onEndGame: any,
  setIsEndGameModalOpen: any
) => {
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
