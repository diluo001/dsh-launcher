import { WindowControls } from "./WindowControls";

type TopBarProps = {
  title: string;
};

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="topbar" data-tauri-drag-region>
      <div className="topbar__heading" data-tauri-drag-region>
        <span className="topbar__eyebrow">DSH LAUNCHER</span>
        <h1>{title}</h1>
      </div>

      <div className="topbar__actions">
        <WindowControls allowMaximize={false} />
      </div>
    </header>
  );
}
