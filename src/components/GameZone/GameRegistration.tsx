import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { createClient } from "@supabase/supabase-js";
import { useGameStore } from "../../store/gameStore";
import { InputModal } from "../../common/Modal/InputModal";
import { useNavigate } from "react-router-dom";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const GameRegistration: React.FC<any> = () => {
  const setIsGameOn = useGameStore((state) => state.setIsGameOn);
  const setGameId = useGameStore((state) => state.setGameId);
  const setIsLoading = useGameStore((state) => state.setIsLoading);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const name = localStorage.getItem("userName");

  const players = useGameStore((state) => state.players);
  const retrievePlayers = useGameStore((state) => state.retrievePlayers);
  const onMekapedLogged = useGameStore((state) => state.onMekapedLogged);

  const isGameAvialable = selectedPlayers.length > 3;

  const renderModal = () => {
    return (
      <InputModal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onInputInserted={(name: string) => startGame(name)}
      />
    );
  };

  const deletePlayer = (player: string) => {
    setSelectedPlayers((prevPlayers) => {
      return prevPlayers.filter((p) => p !== player);
    });
  };

  const onPlayerClicked = (playerName: string) => {
    const temp = [...selectedPlayers];
    temp.push(playerName);
    setSelectedPlayers(temp);
  };

  const startGame = async (name: any) => {
    localStorage.setItem("userName", name);
    onMekapedLogged(name);
    setIsModalOpen(false);

    setIsLoading(true);

    let gameId;

    // Retrieve the last inserted ID from the table
    const { data: lastRecord, error: getError } = await supabase
      .from("games")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    // // Generate a new ID by incrementing the last inserted ID
    const nextId = lastRecord ? lastRecord[0].id + 1 : 1;

    const { data } = await supabase
      .from("games")
      .insert([{ id: nextId }])
      .select();
    if (data) {
      gameId = data[0].id;
      setGameId(gameId);
    } else navigate("/error");

    const players = selectedPlayers.reduce((acc: any, currVal: string) => {
      acc[currVal] = 1;
      return acc;
    }, {});

    const { data: lastSessionRecord, error: noData } = await supabase
      .from("poker-sessions")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    const nextSessionId = lastSessionRecord ? lastSessionRecord[0].id + 1 : 1;

    const { data: sessionData, error } = await supabase
      .from("poker-sessions")
      .insert([
        { id: nextSessionId, game_id: gameId, mekaped: name, players: players },
      ])
      .select();

    setIsLoading(false);
    if (error) navigate("/error");
    if (sessionData) setIsGameOn(true);
  };

  useEffect(() => {
    retrievePlayers();
  }, []);

  return (
    <div className="game-preperation-container">
      <h5>Choose Tonight's Players</h5>
      <div className="chosen-players">
        {selectedPlayers.map((player) => (
          <div key={player} className="registered-player">
            <li className="player-name">{player}</li>
            <button className="bin-button" onClick={() => deletePlayer(player)}>
              <FaRegTrashAlt size={25} />
            </button>
          </div>
        ))}
      </div>
      <div className="choose-players-block">
        {players.map((player) => {
          const found = selectedPlayers.find(
            (selectedPlayer: string) => selectedPlayer === player
          );
          return (
            !found && (
              <button
                className="player-btn"
                onClick={() => onPlayerClicked(player)}
              >
                {player}
              </button>
            )
          );
        })}
      </div>
      <Button
        disabled={!isGameAvialable}
        variant="contained"
        className={`start-game-btn btn ${!isGameAvialable ? "disabled" : ""}`}
        onClick={() => (name ? startGame(name) : setIsModalOpen(true))}
      >
        Start Game!
      </Button>
      {renderModal()}
    </div>
  );
};
