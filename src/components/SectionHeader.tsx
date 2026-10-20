import { Icon } from "./Icon";

type SectionHeaderProps = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {action && (
        <button type="button" className="link-btn" onClick={onAction}>
          {action}
          <Icon name="chevron" size={13} />
        </button>
      )}
    </div>
  );
}
