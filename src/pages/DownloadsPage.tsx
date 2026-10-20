import type { DownloadItem, DownloadStatus } from "../types";
import { Icon } from "../components/Icon";

const statusText: Record<DownloadStatus, string> = {
  downloading: "下载中",
  queued: "排队中",
  paused: "已暂停",
};

type DownloadsPageProps = {
  downloads: DownloadItem[];
};

export function DownloadsPage({ downloads }: DownloadsPageProps) {
  const downloading = downloads.filter((item) => item.status === "downloading").length;
  const queued = downloads.filter((item) => item.status === "queued").length;
  const paused = downloads.filter((item) => item.status === "paused").length;

  return (
    <div className="page">
      <div className="dl-summary">
        <div className="stat-chip">
          <span className="stat-chip__value">{downloading}</span>
          <span>下载中</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__value">{queued}</span>
          <span>排队</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__value">{paused}</span>
          <span>已暂停</span>
        </div>
        <button type="button" className="btn btn--ghost dl-summary__action">
          <Icon name="pause" size={13} />
          全部暂停
        </button>
      </div>

      <div className="dl-list">
        {downloads.map((item) => (
          <div className="dl-row" key={item.id}>
            <div className={`dl-row__thumb cover--${item.cover}`}>{item.title.slice(0, 1)}</div>
            <div className="dl-row__body">
              <div className="dl-row__title">
                <strong>{item.title}</strong>
                <span>{item.version}</span>
              </div>
              <div className="dl-bar">
                <span style={{ width: `${item.progress}%` }} />
              </div>
              <div className="dl-stats">
                <span>{item.progress}%</span>
                <span>{item.size}</span>
                <span>{item.speed}</span>
                <span>{item.eta}</span>
              </div>
            </div>
            <div className={`dl-row__status is-${item.status}`}>{statusText[item.status]}</div>
            <button
              type="button"
              className="icon-btn"
              aria-label={item.status === "paused" ? "继续下载" : "暂停下载"}
            >
              <Icon name={item.status === "paused" ? "play" : "pause"} size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
