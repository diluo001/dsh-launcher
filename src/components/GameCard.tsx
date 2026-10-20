import type { Game } from "../types";
import { Icon } from "./Icon";

type GameCardProps = {
  game: Game;
  onPlay: (game: Game) => void;
};

export function GameCard({ game, onPlay }: GameCardProps) {
  const badge = game.installed ? (game.progress >= 100 ? "已安装" : `${game.progress}%`) : "未安装";

  return (
    <article className="game-card">
      <div className={`game-card__cover cover--${game.cover}`}>
        <span className="game-card__glyph" aria-hidden="true">
          {game.title.slice(0, 1)}
        </span>
        <div className="game-card__overlay" />
        <span className="game-card__badge">{badge}</span>
        <button
          type="button"
          className="game-card__play"
          onClick={() => onPlay(game)}
          aria-label={`启动 ${game.title}`}
        >
          <Icon name="play" size={16} />
        </button>
        <div className="game-card__title">
          <h3>{game.title}</h3>
          <p>{game.english}</p>
        </div>
      </div>

      <div className="game-card__info">
        <div className="game-card__line">
          <span>{game.genre}</span>
          <span>{game.size}</span>
        </div>
        {game.installed && (
          <div className="game-card__progress">
            <span style={{ width: `${game.progress}%` }} />
          </div>
        )}
      </div>
    </article>
  );
}
