import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { FiRefreshCw } from "react-icons/fi";
import { AlertDialog } from "../UI/Modal/Modal";
import Button from "@mui/material/Button";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../store/gameStore";
import { ApiLoader } from "../UI/ApiLoader";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export const GamePlay: React.FC<any> = () => {
  const [isKipudModalOpen, setIsKipudModalOpen] = useState(false);
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
  const [playersBalance, setPlayersBalance]: any = useState({});
  const [balanceChanges, setBalanceChanges] = useState({});
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNewPlayer, setSelectedNewPlayer] = useState("");

  const gameId = useGameStore((state) => state.gameId);
  const players = useGameStore((state) => state.players);

  const onKipudConfirm = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("poker-sessions")
      .insert({ game_id: gameId, mekaped: "someone", players: playersBalance })
      .select();

    if (data) {
      retrieveGameData();
    }
    if (error) console.log(error);
    setIsKipudModalOpen(false);

    setIsLoading(false);
  };

  const retrieveGameData = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("poker-sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data) {
      setPlayersBalance(data[0].players);
    }
    if (error) console.log(error);

    setIsLoading(false);
  };

  const getLatestPlayersBalance = async () => {
    const { data, error } = await supabase
      .from("poker-sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data) {
      return data[0].players;
    }
    if (error) console.log(error);
    return null;
  };

  const onPlayerBalanceChange = (name: string, count: number) => {
    const tempPlayers: any = { ...playersBalance };
    tempPlayers[name] = count;
    setPlayersBalance(tempPlayers);
  };

  const handleKipud = () => {
    setIsKipudModalOpen(true);
    const balance = getLatestPlayersBalance();
    balance.then((previousBalance) => {
      const balanceDiff = Object.entries(previousBalance).reduce(
        (acc: any, [key, value]: any) => {
          if (previousBalance[key] - playersBalance[key] !== 0)
            acc[key] = playersBalance[key] - previousBalance[key];

          return acc;
        },
        {}
      );
      setBalanceChanges(balanceDiff);
    });
  };

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

  const onAddPlayer = async () => {
    const found = Object.keys(playersBalance).find(
      (player) => player === selectedNewPlayer
    );
    if (found) return;

    const tempNewBalance = { ...playersBalance };
    tempNewBalance[selectedNewPlayer] = 1;
    setPlayersBalance(tempNewBalance);

    setIsLoading(true);

    const { data, error } = await supabase
      .from("poker-sessions")
      .insert({ game_id: gameId, mekaped: "someone", players: tempNewBalance })
      .select();

    if (data) {
      retrieveGameData();
    }
    if (error) console.log(error);
    setIsAddPlayerModalOpen(false);

    setIsLoading(false);
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
          className="add-new-player"
          onChange={(e) => setSelectedNewPlayer(e.target.value)}
          value={selectedNewPlayer}
        >
          <option>Select...</option>
          {players.map((player, index) => (
            <option key={index}>{player}</option>
          ))}
        </select>
      </AlertDialog>
    );
  };

  return (
    <>
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
        {renderKipudModal()}
        {renderAddPlayerModal()}
      </div>
    </>
  );
};
