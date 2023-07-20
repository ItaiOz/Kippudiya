import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.REACT_APP_PROJECT_URL;
const supabaseKey: any = process.env.REACT_APP_PUBLIC_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

interface IGame {
  isGameOn: boolean;
  players: string[];
  gameId: number;
  isLoading: boolean;
  setIsGameOn: (value: boolean) => void;
  setPlayers: (retrievedPlayers: string[]) => void;
  retrievePlayers: () => void;
  setGameId: (num: number) => void;
  setIsLoading: (val: boolean) => void;
}

export const useGameStore = create<IGame>((set) => ({
  isGameOn: false,
  isLoading: false,
  players: [],
  setIsGameOn: (value: boolean) => set({ isGameOn: value }),
  setPlayers: (retrievedPlayers: string[]) =>
    set({ players: retrievedPlayers }),
  retrievePlayers: async () => {
    const { data, error } = await supabase.from("players").select();

    if (error) {
      console.log(error);
      return;
    }
    const playersResponse: any = data.map((item: any) => {
      return item.name;
    });
    useGameStore.getState().setPlayers(playersResponse);
  },
  gameId: 0,
  setGameId: (num: number) => set({ gameId: num }),
  setIsLoading: (val: boolean) => set({ isLoading: val }),
}));
