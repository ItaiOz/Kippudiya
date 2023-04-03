import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import GroupsIcon from "@mui/icons-material/Groups";
import StyleIcon from "@mui/icons-material/Style";

export interface FooterItem {
  label: string;
  imageKey: string;
  id: number;
}

export const FOOTER_CONFIG: FooterItem[] = [
  {
    id: 1,
    imageKey: "home",
    label: "Home",
  },
  {
    id: 2,
    imageKey: "history",
    label: "History",
  },
  {
    id: 3,
    imageKey: "leaderboard",
    label: "Leaderboard",
  },
  {
    id: 4,
    imageKey: "players",
    label: "Players",
  },
  {
    id: 5,
    imageKey: "gameZone",
    label: "GameZone",
  },
];

export const FooterIconDictionary: { [key: string]: any } = {
  home: <HomeIcon />,
  leaderboard: <LeaderboardIcon />,
  history: <HistoryIcon />,
  players: <GroupsIcon />,
  gameZone: <StyleIcon />,
};
