import { useState } from "react";

export type StartPage = "home" | "last";
export type Density = "comfortable" | "compact";
export type ProxyMode = "direct" | "system" | "manual";
export type CdnRegion = "auto" | "east" | "south";

export type AppSettings = {
  autoStart: boolean;
  minimizeToTray: boolean;
  rememberAccount: boolean;
  language: string;
  startPage: StartPage;
  downloadPath: string;
  concurrentDownloads: number;
  speedLimit: number;
  autoUpdate: boolean;
  verifyDownloads: boolean;
  density: Density;
  reduceMotion: boolean;
  proxyMode: ProxyMode;
  proxyAddress: string;
  cdn: CdnRegion;
};

const STORAGE_KEY = "dsh-settings";

const DEFAULT_SETTINGS: AppSettings = {
  autoStart: false,
  minimizeToTray: true,
  rememberAccount: true,
  language: "zh-CN",
  startPage: "home",
  downloadPath: "D:\\Games\\DSH",
  concurrentDownloads: 2,
  speedLimit: 0,
  autoUpdate: true,
  verifyDownloads: true,
  density: "comfortable",
  reduceMotion: false,
  proxyMode: "direct",
  proxyAddress: "",
  cdn: "auto",
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(raw) as Partial<AppSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((previous) => {
      const next = { ...previous, [key]: value };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage failures
      }
      return next;
    });
  };

  return { settings, update };
}
