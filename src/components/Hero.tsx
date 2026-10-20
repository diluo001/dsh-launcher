import type { Game } from "../types";
import { Icon } from "./Icon";

type HeroProps = {
  game: Game;
  onPlay: (game: Game) => void;
};

export function Hero({ game, onPlay }: HeroProps) {
  return (
    <section className="hero">
      <div className={`hero__art cover--${game.cover}`} />
      <div className="hero__shade" />
      <span className="hero__watermark" aria-hidden="true">
        VOID
      </span>

      <div className="hero__content">
        <span className="hero__eyebrow">本周精选 · {game.genre}</span>
        <h2 className="hero__title">{game.title}</h2>
        <p className="hero__english">{game.english}</p>
        <p className="hero__desc">{game.description}</p>

        <div className="hero__tags">
          {game.tags.map((tag) => (
            <span key={tag} className="hero__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => onPlay(game)}>
            <Icon name="play" size={15} />
            开始游戏
          </button>
          <button type="button" className="btn btn--ghost">
            查看详情
          </button>
        </div>

        <div className="hero__meta">
          <span className="dot" />
          <span>已安装 · {game.size}</span>
          <span>·</span>
          <span>上次游玩 {game.lastPlayed}</span>
        </div>
      </div>

      <div className="hero__pager">
        <span>01 / 03</span>
        <span className="hero__dots">
          <i className="is-active" />
          <i />
          <i />
        </span>
      </div>
    </section>
  );
}
