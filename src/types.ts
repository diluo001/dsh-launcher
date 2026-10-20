export type NavId =
  | "home"
  | "store"
  | "downloads"
  | "friends"
  | "gifts"
  | "settings";

export type CoverKey = "void" | "ember" | "deep" | "starport" | "iron" | "frost";

export type Game = {
  id: string;
  title: string;
  english: string;
  genre: string;
  cover: CoverKey;
  progress: number;
  installed: boolean;
  favorite: boolean;
  size: string;
  lastPlayed: string;
  tags: string[];
  description: string;
};

export type DownloadStatus = "downloading" | "queued" | "paused";

export type DownloadItem = {
  id: string;
  title: string;
  version: string;
  progress: number;
  speed: string;
  eta: string;
  size: string;
  cover: CoverKey;
  status: DownloadStatus;
};
