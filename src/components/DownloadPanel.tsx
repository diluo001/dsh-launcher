import type { DownloadItem } from "../types";
import { Icon } from "./Icon";

type DownloadPanelProps = {
  downloads: DownloadItem[];
  onOpenDownloads: () => void;
};

export function DownloadPanel({ downloads, onOpenDownloads }: DownloadPanelProps) {
  const active = downloads[0];
  if (!active) return null;

  const queue = downloads.slice(1);

  return (
    <aside className="dl-card">
      <div className="dl-card__head">
        <h3>下载中心</h3>
        <button type="button" className="link-btn" onClick={onOpenDownloads}>
          全部任务 <Icon name="chevron" size={13} />
        </button>
      </div>

      <div className="dl-active">
        <div className={`dl-thumb cover--${active.cover}`}>
          <span>{active.title.slice(0, 1)}</span>
        </div>
        <div className="dl-active__body">
          <div className="dl-active__row">
            <strong>{active.title}</strong>
            <span>{active.version}</span>
          </div>
          <div className="dl-bar">
            <span style={{ width: `${active.progress}%` }} />
          </div>
          <div className="dl-stats">
            <span>{active.progress}%</span>
            <span>{active.speed}</span>
            <span>剩余 {active.eta}</span>
          </div>
        </div>
      </div>

      <div className="dl-active__actions">
        <span>峰值 48.2 MB/s</span>
        <button type="button" className="dl-action">
          <Icon name="pause" size={11} />
          暂停
        </button>
      </div>

      <div className="dl-queue">
        {queue.map((item) => (
          <div className="dl-queue__row" key={item.id}>
            <span className={`dl-queue__dot cover--${item.cover}`} />
            <span className="name">{item.title}</span>
            <span className="mini-bar">
              <span style={{ width: `${item.progress}%` }} />
            </span>
            <span className="pct">{item.progress}%</span>
          </div>
        ))}
      </div>

      <div className="dl-card__foot">
        <Icon name="monitor" size={13} />
        <span>下载限速已关闭 · 磁盘剩余 145 GB</span>
      </div>
    </aside>
  );
}
