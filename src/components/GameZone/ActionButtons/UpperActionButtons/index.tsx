import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

interface Props {
  onToggleRefresh: any;
  onWhatsappShare: any;
}
export const UpperActionButtons: React.FC<Props> = ({
  onToggleRefresh,
  onWhatsappShare,
}: Props) => {
  return (
    <div className="game-play-upper-btns">
      <button className="refresh-button" onClick={() => onToggleRefresh()}>
        <FiRefreshCw />
        <span className="refresh-txt">Refresh</span>
      </button>
      <button className="whatsapp-btn" onClick={onWhatsappShare}>
        <FaWhatsapp color="white" size={40} />
      </button>
    </div>
  );
};
