import { useEffect, useState } from "react";
import { Icon } from "../components/Icon";
import { homeFeatured } from "../data/games";
import {
  activities,
  announcements,
  communityPosts,
  heroSlides,
} from "../data/home";
import type { Game } from "../types";

type HomePageProps = {
  onPlay: (game: Game) => void;
};

export function HomePage({ onPlay }: HomePageProps) {
  const { game, version, disk, status, lastPlayed } = homeFeatured;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="page home">
      <div className="home__grid">
        <div className="home__row home__row--top">
          <section className="panel carousel" aria-label="游戏轮播图">
          {heroSlides.map((item, index) => (
            <div
              key={item.eyebrow}
              className={`carousel__slide${index === slide ? " is-active" : ""}`}
            >
              <div className={`carousel__art cover--${item.cover}`} />
              <div className="carousel__shade" />
              <div className="carousel__caption">
                <span className="carousel__eyebrow">
                  {game.title} · {item.eyebrow}
                </span>
                <h3 className="carousel__title">{item.title}</h3>
                <p className="carousel__sub">{item.sub}</p>
              </div>
            </div>
          ))}

          <div className="carousel__dots">
            {heroSlides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                className={`carousel__dot${index === slide ? " is-active" : ""}`}
                aria-label={`第 ${index + 1} 张`}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className="panel events" aria-label="活动">
          <div className="panel__head">
            <h3>活动</h3>
            <span className="panel__more">全部活动</span>
          </div>
          <div className="events__list">
            {activities.map((item) => (
              <article className="event" key={item.id}>
                <div className={`event__art cover--${item.cover}`} />
                <div className="event__shade" />
                <div className="event__body">
                  <span className="event__tag">{item.tag}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <div className="event__meta">
                    <span className="event__time">{item.time}</span>
                    <span className="event__link">查看</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        </div>

        <div className="home__row home__row--bottom">
          <section className="panel community" aria-label="社区帖子">
          <div className="panel__head">
            <h3>社区</h3>
            <span className="panel__more">进入社区</span>
          </div>
          <div className="community__list">
            {communityPosts.map((post) => (
              <article className="post" key={post.id}>
                <span className="post__avatar">{post.avatar}</span>
                <div className="post__body">
                  <div className="post__meta">
                    <strong>{post.author}</strong>
                    <span>{post.time}</span>
                  </div>
                  <p>{post.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel notices" aria-label="公告">
          <div className="panel__head">
            <h3>公告</h3>
            <span className="panel__more">全部公告</span>
          </div>
          <div className="notices__list">
            {announcements.map((item) => (
              <div className="notice" key={item.id}>
                <span className={`notice__tag notice__tag--${item.tone}`}>
                  {item.tag}
                </span>
                <span className="notice__title">{item.title}</span>
                <span className="notice__date">{item.date}</span>
              </div>
            ))}
          </div>
          </section>
        </div>
      </div>

      <footer className="home__bar">
        <div className="home__brand">
          <span className={`home__brand-cover cover--${game.cover}`}>虚</span>
          <div className="home__brand-copy">
            <strong>{game.title}</strong>
            <small>{game.english}</small>
          </div>
        </div>

        <div className="home__actions">
          <div className="launch-status">
            <div className="launch-status__item launch-status__item--state">
              <span>状态</span>
              <strong>
                <i className="launch-dot" />
                {status}
              </strong>
            </div>
            <span className="launch-status__sep" />
            <div className="launch-status__item">
              <span>版本</span>
              <strong>{version}</strong>
            </div>
            <span className="launch-status__sep" />
            <div className="launch-status__item">
              <span>上次游玩</span>
              <strong>{lastPlayed}</strong>
            </div>
            <span className="launch-status__sep" />
            <div className="launch-status__item">
              <span>占用空间</span>
              <strong>{disk}</strong>
            </div>
          </div>

          <button
            type="button"
            className="launch-play"
            onClick={() => onPlay(game)}
          >
            <Icon name="play" size={17} />
            启动游戏
          </button>
        </div>
      </footer>
    </div>
  );
}
