import React, { useState } from "react";
import "./style.scss";

interface Props {
  player: string;
  balance: number;
  onBalanceChange: Function;
}

export const PPlayer: React.FC<Props> = ({
  player,
  balance,
  onBalanceChange,
}: Props) => {
  const [showIncreaseAnimation, setShowIncreaseAnimation] = useState(false);
  const [increaseAnimationKey, setIncreaseAnimationKey] = useState(0);
  const [showDecreaseAnimation, setShowDecreaseAnimation] = useState(false);
  const [decreaseAnimationKey, setDecreaseAnimationKey] = useState(0);

  const handleIncrease = () => {
    onBalanceChange(player, balance + 1);
    setShowIncreaseAnimation(true);
    setIncreaseAnimationKey(increaseAnimationKey + 1);
  };

  const handleDecrease = () => {
    onBalanceChange(player, balance - 1);
    setShowDecreaseAnimation(true);
    setDecreaseAnimationKey(decreaseAnimationKey + 1);
  };

  setTimeout(() => {
    setShowIncreaseAnimation(false);
    setShowDecreaseAnimation(false);
  }, 500);

  return (
    <div className="player-stats">
      <span>{player}</span>
      <div className="kipud-controls">
        <button className="balance-button btn" onClick={handleDecrease}>
          -
        </button>
        <div className="number-container">
          <span className="buy-in-count">{balance}</span>
          {showIncreaseAnimation && (
            <span className="animation" key={increaseAnimationKey}>
              +1
            </span>
          )}
          {showDecreaseAnimation && (
            <span className="animation" key={decreaseAnimationKey}>
              -1
            </span>
          )}
        </div>
        <button className="balance-button btn" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};
