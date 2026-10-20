import { useEffect, useRef, useState } from "react";
import { themeOptions, useTheme } from "../theme";
import { Icon } from "./Icon";
import { ThemeArt } from "./ThemeArt";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const current = themeOptions.find((item) => item.id === theme) ?? themeOptions[0];

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        type="button"
        className={`window-control theme-trigger${open ? " is-open" : ""}`}
        aria-label="切换界面风格"
        aria-expanded={open}
        title={`界面风格：${current.name}`}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="palette" size={15} />
        <span
          className="theme-trigger__dot"
          style={{
            background: `linear-gradient(135deg, ${current.accentSoft}, ${current.accentDeep})`,
          }}
        />
      </button>

      {open && (
        <div className="theme-popover" role="dialog" aria-label="界面风格">
          <div className="theme-popover__head">
            <strong>界面风格</strong>
            <span>{themeOptions.length} 套</span>
          </div>

          <div className="theme-tiles">
            {themeOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                title={`${item.name} · ${item.desc}`}
                className={`theme-tile${item.id === theme ? " is-active" : ""}`}
                onClick={() => {
                  setTheme(item.id);
                  setOpen(false);
                }}
              >
                <ThemeArt theme={item} />
                <span className="theme-tile__name">{item.name}</span>
                {item.id === theme && (
                  <span className="theme-tile__check">
                    <Icon name="check" size={9} />
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="theme-popover__foot">风格只影响客户端外观，不影响游戏与下载。</p>
        </div>
      )}
    </div>
  );
}
