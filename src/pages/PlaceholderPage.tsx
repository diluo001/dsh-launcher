import type { IconName } from "../components/Icon";
import { Icon } from "../components/Icon";

type PlaceholderPageProps = {
  title: string;
  description: string;
  icon: IconName;
  onBack: () => void;
  onLogout?: () => void;
};

export function PlaceholderPage({ title, description, icon, onBack, onLogout }: PlaceholderPageProps) {
  return (
    <div className="page">
      <div className="placeholder">
        <span className="placeholder__icon">
          <Icon name={icon} size={26} />
        </span>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="placeholder__actions">
          <button type="button" className="btn btn--primary" onClick={onBack}>
            回到首页
          </button>
          {onLogout && (
            <button type="button" className="btn btn--ghost" onClick={onLogout}>
              退出登录
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
