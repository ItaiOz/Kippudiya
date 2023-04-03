import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { FiRefreshCw } from "react-icons/fi";
import { AlertDialog } from "../UI/Modal/Modal";
import Button from "@mui/material/Button";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../store/gameStore";
import { getKipudModalBody } from "../utils";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export const GamePlay: React.FC<any> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState({});
  const [playersBalance, setPlayersBalance]: any = useState({});
  const [balanceChanges, setBalanceChanges] = useState({});
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const gameId = useGameStore((state) => state.gameId);

  const onModalConfirm = async () => {
    setIsModalOpen(false);

    const { data, error } = await supabase
      .from("poker-sessions")
      .insert({ game_id: gameId, mekaped: "someone", players: playersBalance })
      .select();

    if (error) console.log(error);
  };

  // const renderModal = () => {
  //   return (
  //     <AlertDialog
  //       playersChanges={balanceChanges}
  //       modalBody={getKipudModalBody(balanceChanges)}
  //       isDisabled={Object.keys(balanceChanges).length === 0}
  //       onConfirm={() => onModalConfirm()}
  //       isOpen={isModalOpen}
  //       onCloseModal={() => setIsModalOpen(false)}
  //     />
  //   );
  // };

  const retrieveGameData = async () => {
    const { data, error } = await supabase
      .from("poker-sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data) {
      setPlayers(data[0].players);
      setPlayersBalance(data[0].players);
    }
    if (error) console.log(error);
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
    setIsModalOpen(true);
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

  return (
    <>
      <div className="players-balance">
        {Object.entries(players).map(([player, balance]: any, index) => (
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
          onClick={handleKipud}
        >
          `` Add New Player
        </Button>
      </div>
      <AlertDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Content
      </AlertDialog>
    </>
  );
};
