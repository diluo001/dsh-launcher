import { useState } from "react";
import { IconRail } from "./components/IconRail";
import { LoginScreen } from "./components/LoginScreen";
import { TopBar } from "./components/TopBar";
import { downloads } from "./data/games";
import { DownloadsPage } from "./pages/DownloadsPage";
import { GiftPage } from "./pages/GiftPage";
import { HomePage } from "./pages/HomePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { SettingsPage } from "./pages/SettingsPage";
import type { Game, NavId } from "./types";
import "./App.css";

const pageTitles: Record<NavId, string> = {
  home: "首页",
  store: "商店",
  downloads: "下载中心",
  friends: "社区",
  gifts: "礼包",
  settings: "设置",
};

function initialNav(): NavId {
  switch (window.location.hash.replace("#", "").split("/")[0]) {
    case "store":
      return "store";
    case "downloads":
      return "downloads";
    case "friends":
      return "friends";
    case "gifts":
      return "gifts";
    case "settings":
      return "settings";
    default:
      return "home";
  }
}

function App() {
  const [nav, setNav] = useState<NavId>(initialNav);
  const [toast, setToast] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return window.sessionStorage.getItem("dsh-auth") === "1";
    } catch {
      return false;
    }
  });

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handlePlay = (game: Game) => {
    notify(`正在启动 ${game.title}…`);
  };

  const handleLogin = () => {
    try {
      window.sessionStorage.setItem("dsh-auth", "1");
    } catch {
      // ignore storage failures
    }
    setNav("home");
    setAuthenticated(true);
  };

  const handleLogout = () => {
    try {
      window.sessionStorage.removeItem("dsh-auth");
    } catch {
      // ignore storage failures
    }
    setNav("home");
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginScreen onSuccess={handleLogin} />;
  }

  return (
    <div className="app">
      <IconRail active={nav} onChange={setNav} />

      <main className="main">
        <TopBar title={pageTitles[nav]} />

        <div className={`main__inner${nav === "home" ? " main__inner--home" : ""}`}>
          <div className="page-slot" key={nav}>
            {nav === "home" && <HomePage onPlay={handlePlay} />}

            {nav === "downloads" && <DownloadsPage downloads={downloads} />}

            {nav === "store" && (
              <PlaceholderPage
                title="商店正在接入"
                description="游戏目录、榜单与购买链路下一步接进来。当前先用本地模拟数据把界面和交互跑通。"
                icon="store"
                onBack={() => setNav("home")}
              />
            )}

            {nav === "friends" && (
              <PlaceholderPage
                title="社区还在路上"
                description="好友动态、组队邀请和游戏成就都会放在这里。先把首页与下载中心打磨好。"
                icon="friends"
                onBack={() => setNav("home")}
              />
            )}

            {nav === "gifts" && <GiftPage onNotify={notify} />}

            {nav === "settings" && (
              <SettingsPage onLogout={handleLogout} onNotify={notify} />
            )}
          </div>
        </div>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
