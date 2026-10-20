import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { ThemeSwitcher } from "./ThemeSwitcher";

type WindowControlsProps = {
  allowMaximize?: boolean;
};

export function WindowControls({ allowMaximize = true }: WindowControlsProps) {
  const [maximized, setMaximized] = useState(false);
  const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

  useEffect(() => {
    if (!isTauri || !allowMaximize) return;

    const appWindow = getCurrentWindow();
    let unlisten: (() => void) | undefined;

    appWindow.isMaximized().then(setMaximized).catch(() => {});
    appWindow
      .onResized(() => {
        appWindow.isMaximized().then(setMaximized).catch(() => {});
      })
      .then((fn) => {
        unlisten = fn;
      })
      .catch(() => {});

    return () => {
      unlisten?.();
    };
  }, [allowMaximize, isTauri]);

  const handle = async (action: "minimize" | "toggle" | "close") => {
    if (!isTauri) return;

    const appWindow = getCurrentWindow();
    try {
      if (action === "minimize") {
        await appWindow.minimize();
      } else if (action === "toggle") {
        await appWindow.toggleMaximize();
      } else {
        await appWindow.close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="window-controls">
      <ThemeSwitcher />
      <span className="window-controls__sep" aria-hidden="true" />

      <button
        type="button"
        className="window-control"
        aria-label="最小化"
        title="最小化"
        onClick={() => handle("minimize")}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M5 12h14" />
        </svg>
      </button>

      {allowMaximize && (
        <button
          type="button"
          className="window-control"
          aria-label={maximized ? "还原" : "最大化"}
          title={maximized ? "还原" : "最大化"}
          onClick={() => handle("toggle")}
        >
          {maximized ? (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="4" y="8" width="12" height="12" rx="1.5" />
              <path d="M8 8V4h12v12h-4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <rect x="5" y="5" width="14" height="14" rx="1.5" />
            </svg>
          )}
        </button>
      )}

      <button
        type="button"
        className="window-control window-control--close"
        aria-label="关闭"
        title="关闭"
        onClick={() => handle("close")}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
