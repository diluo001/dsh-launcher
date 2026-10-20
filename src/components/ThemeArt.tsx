import type { ThemeOption } from "../theme";

/**
 * 风格缩略图：用该主题真实的底色、面板色和双强调色拼一个小界面，
 * 比单一渐变色块更容易一眼区分。
 */
export function ThemeArt({
  theme,
  className = "",
}: {
  theme: ThemeOption;
  className?: string;
}) {
  return (
    <span
      className={`theme-art ${className}`.trim()}
      style={{ background: theme.bg }}
      aria-hidden="true"
    >
      <span
        className="theme-art__glow"
        style={{
          background: `radial-gradient(90% 80% at 84% 4%, ${theme.accent}66, transparent 70%)`,
        }}
      />
      <span
        className="theme-art__rail"
        style={{
          background: `linear-gradient(180deg, ${theme.accentSoft}, ${theme.accentDeep})`,
        }}
      />
      <span
        className="theme-art__panel"
        style={{ background: `rgb(${theme.panelRgb})` }}
      />
      <span className="theme-art__chip" style={{ background: theme.accent }} />
      <span className="theme-art__dot" style={{ background: theme.accent2 }} />
    </span>
  );
}
