import React from "react";

interface Props {
  player: any;
  index: number;
  onAddAnotherPlayer: Function;
  onDeletePlayer: Function;
}

export const PlayerInput: React.FC<Props> = ({
  player,
  index,
  onAddAnotherPlayer,
  onDeletePlayer,
}: Props) => {
  return (
    <div className="insert-player-input" key={index}>
      <input type="text" placeholder="Enter player name" />
      <button onClick={() => onAddAnotherPlayer}>+</button>
      <button onClick={() => onDeletePlayer(player)}>trash</button>
    </div>
  );
};
