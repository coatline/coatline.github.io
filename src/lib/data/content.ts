export type LifeEventType =
  | "career"
  | "game"
  | "achievement"
  | "personal";

export interface LifeEvent {
  date: string;
  title: string;
  description: string;

  type: LifeEventType;

  location?: string;
  link?: string;
  image?: string;

  featured?: boolean;
  tags?: string[];
}

export const life: LifeEvent[] = [
  {
    date: "June 2026 - August 2026",
    title: "CGI",
    description: "Software Development Intern",
    type: "career",
    featured: true,
    tags: ["Java", "Spring Boot"]
  },
  {
    date: "June 2026 - July 2026",
    title: "Resonance Systems",
    description: "Software Development Intern",
    type: "career",
    tags: ["TypeScript", "JavaScript"]
  },
  {
    date: "August 2026",
    title: "Started Tennessee Tech",
    description: "Began pursuing a Bachelor's degree in Computer Science.",
    type: "personal",
    featured: true
  },
  {
    date: "March 2026",
    title: "Released Paper Towel Royale",
    description: "Released my first commercial game on Steam after nearly four years of development.",
    type: "game",
    featured: true,
    tags: ["Unity", "C#", "Steam"],
    link: "https://store.steampowered.com/app/3269830/Paper_Towel_Royale/"
  },
  {
    date: "May 2023 - July 2025",
    title: "Chick-fil-A Team Member",
    description: "Worked front of house and customer service while developing games and attending high school.",
    type: "career",
    tags: ["Customer Service"]
  }
];

export const stats = [
  { value: "5+", label: "Years Programming" },
  { value: "1", label: "Steam Release" },
  { value: "30+", label: "Game Jams" }
];

export const heroVideos = [
  // { src: "/videos/gameplay-1.mp4" },
  // { src: "/videos/gameplay-2.mp4" },
  // { src: "/videos/gameplay-3.mp4" },
];