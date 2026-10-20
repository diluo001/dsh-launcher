import type { NavId } from "../types";
import { Icon, type IconName } from "./Icon";

type RailItem = {
  id: NavId;
  label: string;
  icon: IconName;
};

const primary: RailItem[] = [
  { id: "home", label: "首页", icon: "home" },
  { id: "store", label: "商店", icon: "store" },
  { id: "downloads", label: "下载", icon: "download" },
  { id: "friends", label: "社区", icon: "friends" },
  { id: "gifts", label: "礼包", icon: "gift" },
];

type IconRailProps = {
  active: NavId;
  onChange: (id: NavId) => void;
};

export function IconRail({ active, onChange }: IconRailProps) {
  return (
    <aside className="rail">
      <div className="rail__logo" aria-hidden="true">
        D
      </div>

      <nav className="rail__nav" aria-label="主导航">
        {primary.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rail__item${active === item.id ? " is-active" : ""}`}
            onClick={() => onChange(item.id)}
            title={item.label}
            aria-label={item.label}
          >
            <Icon name={item.icon} size={20} />
            <span className="rail__label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="rail__bottom">
        <button
          type="button"
          className={`rail__item${active === "settings" ? " is-active" : ""}`}
          onClick={() => onChange("settings")}
          title="设置"
          aria-label="设置"
        >
          <Icon name="settings" size={20} />
          <span className="rail__label">设置</span>
        </button>
      </div>
    </aside>
  );
}
