import { useEffect, useState } from "react";

/**
 * 18 套界面风格。
 * 每套同时定义强调色、底色与面板色，切换时整个客户端（含登录页、
 * 弹层、设置面板）会一起变色，而不只是换一条高亮线。
 * 这里的数据同时用于生成风格预览块，CSS 里的变量必须与之一致。
 */
export const themeOptions = [
  {
    id: "ember",
    name: "熔火",
    desc: "橙 · 深空",
    bg: "#080b11",
    panelRgb: "22, 28, 43",
    accent: "#ff6b2b",
    accentSoft: "#ff9a4d",
    accentDeep: "#ff4d1f",
    accent2: "#35c2ff",
  },
  {
    id: "amber",
    name: "余烬",
    desc: "琥珀 · 暖橙",
    bg: "#0d0906",
    panelRgb: "34, 26, 17",
    accent: "#f5b544",
    accentSoft: "#ffd37a",
    accentDeep: "#e0961f",
    accent2: "#ff7a45",
  },
  {
    id: "sunset",
    name: "落日",
    desc: "珊瑚 · 暮色",
    bg: "#120709",
    panelRgb: "42, 19, 21",
    accent: "#ff7a4d",
    accentSoft: "#ffa57a",
    accentDeep: "#e8502a",
    accent2: "#ff4d8d",
  },
  {
    id: "wine",
    name: "酒红",
    desc: "勃艮第 · 玫瑰金",
    bg: "#100609",
    panelRgb: "40, 17, 23",
    accent: "#e0455f",
    accentSoft: "#ff8a9c",
    accentDeep: "#b52240",
    accent2: "#f0a35e",
  },
  {
    id: "crimson",
    name: "赤瞳",
    desc: "赤红 · 夜视",
    bg: "#0c0505",
    panelRgb: "38, 14, 14",
    accent: "#ff453a",
    accentSoft: "#ff8a7a",
    accentDeep: "#d92b1f",
    accent2: "#ff9f43",
  },
  {
    id: "forest",
    name: "森屿",
    desc: "苔绿 · 林影",
    bg: "#070d08",
    panelRgb: "20, 34, 18",
    accent: "#8fdc4b",
    accentSoft: "#c2f58a",
    accentDeep: "#62b52a",
    accent2: "#f0d36a",
  },
  {
    id: "abyss",
    name: "深渊",
    desc: "青碧 · 深海",
    bg: "#04100e",
    panelRgb: "12, 36, 32",
    accent: "#2fe0c0",
    accentSoft: "#7df5dd",
    accentDeep: "#12b89a",
    accent2: "#4d9dff",
  },
  {
    id: "terminal",
    name: "终端",
    desc: "磷光 · 黑底",
    bg: "#030805",
    panelRgb: "10, 27, 17",
    accent: "#4dff88",
    accentSoft: "#9dffb8",
    accentDeep: "#17d95a",
    accent2: "#b6ff5c",
  },
  {
    id: "aurora",
    name: "极光",
    desc: "青蓝 · 薄荷",
    bg: "#050f14",
    panelRgb: "16, 36, 44",
    accent: "#35c2ff",
    accentSoft: "#7ee7ff",
    accentDeep: "#1e9bff",
    accent2: "#3ddc97",
  },
  {
    id: "frost",
    name: "冰霜",
    desc: "冰蓝 · 冷白",
    bg: "#070d12",
    panelRgb: "20, 32, 42",
    accent: "#9fe8ff",
    accentSoft: "#d6f6ff",
    accentDeep: "#6fc9f5",
    accent2: "#5b8cff",
  },
  {
    id: "slate",
    name: "雾蓝",
    desc: "钢蓝 · 雾灰",
    bg: "#080c12",
    panelRgb: "21, 30, 42",
    accent: "#8fb7e8",
    accentSoft: "#c4dcf7",
    accentDeep: "#6393d1",
    accent2: "#7c8cff",
  },
  {
    id: "voyage",
    name: "夜航",
    desc: "深蓝 · 电光",
    bg: "#050a16",
    panelRgb: "12, 24, 44",
    accent: "#4d7cff",
    accentSoft: "#8fb0ff",
    accentDeep: "#2f5ce0",
    accent2: "#22d3ee",
  },
  {
    id: "cyber",
    name: "赛博",
    desc: "荧光绿 · 电光青",
    bg: "#05090a",
    panelRgb: "13, 26, 26",
    accent: "#c6ff3d",
    accentSoft: "#e2ff8a",
    accentDeep: "#9ad900",
    accent2: "#22d3ee",
  },
  {
    id: "void",
    name: "虚空",
    desc: "紫罗兰 · 霓虹",
    bg: "#0a0714",
    panelRgb: "26, 20, 44",
    accent: "#8b6cff",
    accentSoft: "#b49bff",
    accentDeep: "#6a4dff",
    accent2: "#ff5fa2",
  },
  {
    id: "neon",
    name: "霓虹",
    desc: "品红 · 电青",
    bg: "#0d0610",
    panelRgb: "32, 15, 36",
    accent: "#ff4fa3",
    accentSoft: "#ff8ac2",
    accentDeep: "#ff2e88",
    accent2: "#35e0ff",
  },
  {
    id: "sakura",
    name: "樱",
    desc: "樱粉 · 紫调",
    bg: "#0f070c",
    panelRgb: "38, 19, 29",
    accent: "#ff7fb8",
    accentSoft: "#ffb3d4",
    accentDeep: "#e84f92",
    accent2: "#b08cff",
  },
  {
    id: "titanium",
    name: "钛银",
    desc: "银灰 · 极简",
    bg: "#0b0c0e",
    panelRgb: "28, 30, 35",
    accent: "#c8d2df",
    accentSoft: "#eef3fa",
    accentDeep: "#9aa8ba",
    accent2: "#7fb2ff",
  },
  {
    id: "royal",
    name: "王朝",
    desc: "鎏金 · 藏蓝",
    bg: "#0a0a10",
    panelRgb: "28, 26, 42",
    accent: "#e8c15a",
    accentSoft: "#ffe29a",
    accentDeep: "#c39a2e",
    accent2: "#5d7dff",
  },
] as const;

export type ThemeOption = (typeof themeOptions)[number];
export type ThemeId = ThemeOption["id"];

const STORAGE_KEY = "dsh-theme";

function isThemeId(value: string | null): value is ThemeId {
  return themeOptions.some((item) => item.id === value);
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return isThemeId(saved) ? saved : "ember";
    } catch {
      return "ember";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage failures
    }
  }, [theme]);

  return { theme, setTheme };
}
