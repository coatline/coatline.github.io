export interface Project {
  id: string;
  title: string;
  start_date: string;
  release_date?: string;
  tag_line: string;
  gameCategory: GameCategory;
  completionCategory: CompletionCategory;
  tags: string[];
  link?: string;

  longDescription?: string;
  video?: string;
  image?: string;
  linkLabel?: string;
  accentColor?: string;

  game_jam?: string;
  result?: string;
}

export enum GameCategory {
  GAME_JAM,
  SIDE_PROJECT,
  UPCOMING_STEAM_RELEASE,
  STEAM_RELEASE,
}

export enum CompletionCategory {
  RELEASED,
  RELEASED_IN_DEV,
  PROTOTYPE,
  FINISHED,
  WORK_IN_PROGRESS,
}

export const projects: Project[] = [
  {
    id: "paper-towel-royale",
    title: "Paper Towel Royale",
    start_date: "May 26, 2022",
    release_date: "March 13, 2026",
    tag_line:
      "40,000+ lines of C#. Local multiplayer chaos. Started when I was 14 years old. Physics-driven couch co-op mayhem with deep inheritance systems.",
    gameCategory: GameCategory.STEAM_RELEASE,
    completionCategory: CompletionCategory.RELEASED,
    tags: ["C#", "Unity", "Local Multiplayer"],
    link: "https://store.steampowered.com/app/3269830/Paper_Towel_Royale/",
    longDescription:
      "A chaotic local multiplayer game built entirely in Unity with over 40,000 lines of C#. Features deep inheritance hierarchies, dynamic physics, and couch co-op mayhem.",
    linkLabel: "Play on Steam",
    accentColor: "#4e4e4e",
  },
  {
    id: "rimbox",
    title: "Rimbox",
    start_date: "March 14, 2022",
    tag_line: "Inspired by Rimworld.",
    gameCategory: GameCategory.SIDE_PROJECT,
    completionCategory: CompletionCategory.PROTOTYPE,
    tags: ["C#", "Unity", "Pathfinding", "Multithreaded"],
    link: "https://coatline.itch.io/rimbox",
    longDescription:
      "A simulation-heavy project featuring multithreaded plant growth and fire propagation systems, paired with a custom A* pathfinding implementation for autonomous agents.",
    linkLabel: "Play on Itch.io",
    accentColor: "#4ecdc4",
  },
  {
    id: "that-kid-life-jam",
    title: "That Kid Life (Jam Version)",
    start_date: "July 31, 2025",
    release_date: "August 3, 2025",
    tag_line: "Made for the GMTK Game Jam 2025",
    gameCategory: GameCategory.GAME_JAM,
    completionCategory: CompletionCategory.RELEASED,
    tags: ["Unity", "C#", "AI"],
    link: "https://coatline.itch.io/that-kid-life",
    longDescription: "As Timmy, you must survive your parent's strict house!",
    accentColor: "#a78bfa",
    game_jam: "GMTK 2025",
  },
];
