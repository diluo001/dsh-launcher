import { useEffect, useState, type ReactNode } from "react";
import { Icon, type IconName } from "../components/Icon";
import { ThemeArt } from "../components/ThemeArt";
import { themeOptions, useTheme } from "../theme";
import { useSettings } from "../settings";
import type { CdnRegion, Density, ProxyMode, StartPage } from "../settings";

type SettingsPageProps = {
  onLogout: () => void;
  onNotify: (message: string) => void;
};

type TabId = "account" | "general" | "downloads" | "appearance" | "network" | "about";

const tabs: { id: TabId; label: string; icon: IconName }[] = [
  { id: "account", label: "账号", icon: "user" },
  { id: "general", label: "通用", icon: "settings" },
  { id: "downloads", label: "下载", icon: "download" },
  { id: "appearance", label: "外观", icon: "palette" },
  { id: "network", label: "网络", icon: "shield" },
  { id: "about", label: "关于", icon: "info" },
];

const panelMeta: Record<TabId, { title: string; desc: string }> = {
  account: { title: "账号", desc: "管理当前登录账号与本地凭据" },
  general: { title: "通用", desc: "启动、语言与基础行为" },
  downloads: { title: "下载", desc: "目录、并发与限速" },
  appearance: { title: "外观", desc: "主题、密度与动效" },
  network: { title: "网络", desc: "代理、CDN 与连通性" },
  about: { title: "关于", desc: "版本、更新与协议" },
};

function initialTab(): TabId {
  const hash = window.location.hash.replace("#settings/", "");
  const match = tabs.find((item) => item.id === hash);
  return match ? match.id : "account";
}

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch${checked ? " is-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="switch__knob" />
    </button>
  );
}

function SettingRow({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div className="setting-row">
      <div className="setting-row__copy">
        <div className="setting-row__title">{title}</div>
        {desc && <div className="setting-row__desc">{desc}</div>}
      </div>
      <div className="setting-row__control">{children}</div>
    </div>
  );
}

export function SettingsPage({ onLogout, onNotify }: SettingsPageProps) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const [testing, setTesting] = useState(false);
  const { settings, update } = useSettings();
  const { theme, setTheme } = useTheme();
  const meta = panelMeta[tab];

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
    document.documentElement.dataset.density = settings.density;
  }, [settings.reduceMotion, settings.density]);

  const handleTest = () => {
    if (testing) return;
    setTesting(true);
    window.setTimeout(() => {
      setTesting(false);
      onNotify("连接正常 · 延迟 32 ms");
    }, 700);
  };

  const renderTab = () => {
    switch (tab) {
      case "account":
        return (
          <>
            <div className="account-card">
              <div className="account-card__avatar">夜</div>
              <div className="account-card__body">
                <div className="account-card__name">夜行者</div>
                <div className="account-card__meta">
                  <span className="status-dot" />
                  在线 · Lv. 42
                </div>
              </div>
              <span className="account-card__badge">本地测试</span>
            </div>

            <SettingRow title="账号" desc="当前登录的测试账号">
              <span className="settings-value">123456</span>
            </SettingRow>
            <SettingRow title="登录方式" desc="账号密码登录">
              <span className="settings-value">密码</span>
            </SettingRow>
            <SettingRow title="本地凭据" desc="登录状态只保存在当前设备">
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={() => onNotify("本地凭据已清除（测试模式）")}
              >
                清除
              </button>
            </SettingRow>

            <div className="settings-actions">
              <button type="button" className="btn btn--ghost" onClick={onLogout}>
                退出登录
              </button>
            </div>
          </>
        );

      case "general":
        return (
          <>
            <SettingRow title="开机自动启动" desc="登录 Windows 后自动打开 DSH Launcher">
              <Switch
                checked={settings.autoStart}
                onChange={(value) => update("autoStart", value)}
                label="开机自动启动"
              />
            </SettingRow>
            <SettingRow title="关闭时最小化到托盘" desc="点击关闭不退出，收进系统托盘">
              <Switch
                checked={settings.minimizeToTray}
                onChange={(value) => update("minimizeToTray", value)}
                label="关闭时最小化到托盘"
              />
            </SettingRow>
            <SettingRow title="记住账号" desc="下次启动自动填入账号">
              <Switch
                checked={settings.rememberAccount}
                onChange={(value) => update("rememberAccount", value)}
                label="记住账号"
              />
            </SettingRow>
            <SettingRow title="语言" desc="界面显示语言">
              <select
                className="settings-select"
                value={settings.language}
                onChange={(event) => update("language", event.target.value)}
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US" disabled>
                  English（后续）
                </option>
              </select>
            </SettingRow>
            <SettingRow title="启动页" desc="启动后默认进入的页面">
              <select
                className="settings-select"
                value={settings.startPage}
                onChange={(event) => update("startPage", event.target.value as StartPage)}
              >
                <option value="home">首页</option>
                <option value="last">上次离开的页面</option>
              </select>
            </SettingRow>
          </>
        );

      case "downloads":
        return (
          <>
            <SettingRow title="下载目录" desc="游戏安装包与更新文件存放位置">
              <input
                className="settings-input"
                value={settings.downloadPath}
                onChange={(event) => update("downloadPath", event.target.value)}
              />
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={() => onNotify("目录选择会在接入文件对话框后开放")}
              >
                更改
              </button>
            </SettingRow>
            <SettingRow title="同时下载任务" desc="同时进行的最大任务数">
              <select
                className="settings-select"
                value={settings.concurrentDownloads}
                onChange={(event) =>
                  update("concurrentDownloads", Number(event.target.value))
                }
              >
                {[1, 2, 3, 4].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </SettingRow>
            <SettingRow title="下载限速" desc="0 表示不限速">
              <div className="settings-range">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={settings.speedLimit}
                  onChange={(event) => update("speedLimit", Number(event.target.value))}
                />
                <span className="settings-value">
                  {settings.speedLimit === 0 ? "不限速" : `${settings.speedLimit} MB/s`}
                </span>
              </div>
            </SettingRow>
            <SettingRow title="游戏自动更新" desc="启动器运行时自动检查并更新">
              <Switch
                checked={settings.autoUpdate}
                onChange={(value) => update("autoUpdate", value)}
                label="游戏自动更新"
              />
            </SettingRow>
            <SettingRow title="下载完成后校验" desc="校验 SHA-256，损坏时自动重下">
              <Switch
                checked={settings.verifyDownloads}
                onChange={(value) => update("verifyDownloads", value)}
                label="下载完成后校验"
              />
            </SettingRow>
          </>
        );

      case "appearance":
        return (
          <>
            <div className="setting-block">
              <div className="setting-row__title">界面风格</div>
              <div className="setting-row__desc">
                {themeOptions.length} 套，选择后立即生效，重启保留
              </div>
              <div className="theme-choices">
                {themeOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    title={`${item.name} · ${item.desc}`}
                    className={`theme-choice${item.id === theme ? " is-active" : ""}`}
                    onClick={() => setTheme(item.id)}
                  >
                    <ThemeArt theme={item} />
                    <span className="theme-choice__name">{item.name}</span>
                    {item.id === theme && <Icon name="check" size={13} />}
                  </button>
                ))}
              </div>
            </div>
            <SettingRow title="界面密度" desc="控制列表与卡片间距">
              <select
                className="settings-select"
                value={settings.density}
                onChange={(event) => update("density", event.target.value as Density)}
              >
                <option value="comfortable">舒适</option>
                <option value="compact">紧凑</option>
              </select>
            </SettingRow>
            <SettingRow title="减少动效" desc="关闭页面切换与悬停动画">
              <Switch
                checked={settings.reduceMotion}
                onChange={(value) => update("reduceMotion", value)}
                label="减少动效"
              />
            </SettingRow>
          </>
        );

      case "network":
        return (
          <>
            <SettingRow title="代理模式" desc="下载与更新使用的网络代理">
              <select
                className="settings-select"
                value={settings.proxyMode}
                onChange={(event) => update("proxyMode", event.target.value as ProxyMode)}
              >
                <option value="direct">直连</option>
                <option value="system">系统代理</option>
                <option value="manual">手动</option>
              </select>
            </SettingRow>
            <SettingRow title="代理地址" desc="仅手动模式生效">
              <input
                className="settings-input"
                value={settings.proxyAddress}
                disabled={settings.proxyMode !== "manual"}
                onChange={(event) => update("proxyAddress", event.target.value)}
                placeholder="http://127.0.0.1:7890"
              />
            </SettingRow>
            <SettingRow title="CDN 节点" desc="下载加速节点">
              <select
                className="settings-select"
                value={settings.cdn}
                onChange={(event) => update("cdn", event.target.value as CdnRegion)}
              >
                <option value="auto">自动选择</option>
                <option value="east">华东</option>
                <option value="south">华南</option>
              </select>
            </SettingRow>
            <SettingRow title="连接测试" desc="检测当前网络到下载节点的延迟">
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={handleTest}
                disabled={testing}
              >
                {testing ? "测试中…" : "测试连接"}
              </button>
            </SettingRow>
          </>
        );

      case "about":
        return (
          <>
            <div className="about-card">
              <span className="about-card__logo">D</span>
              <div>
                <div className="about-card__name">DSH Launcher</div>
                <div className="about-card__meta">v0.1.0 · Windows · 本地测试版</div>
              </div>
            </div>
            <SettingRow title="检查更新" desc="当前版本 0.1.0">
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={() => onNotify("当前已是最新版本")}
              >
                检查更新
              </button>
            </SettingRow>
            <SettingRow title="运行日志" desc="启动与窗口错误会写入临时目录">
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={() => onNotify("日志：%TEMP%\\dsh-launcher.log")}
              >
                查看路径
              </button>
            </SettingRow>
            <SettingRow title="用户协议" desc="测试阶段仅本地运行">
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={() => onNotify("用户协议将在接入后端后提供")}
              >
                查看
              </button>
            </SettingRow>
            <SettingRow title="隐私政策" desc="登录信息仅保存在当前设备">
              <button
                type="button"
                className="btn btn--ghost settings-btn"
                onClick={() => onNotify("隐私政策将在接入后端后提供")}
              >
                查看
              </button>
            </SettingRow>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page settings">
      <nav className="settings__nav" aria-label="设置分类">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`settings__tab${tab === item.id ? " is-active" : ""}`}
            onClick={() => setTab(item.id)}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <section className="settings__panel">
        <header className="settings__head">
          <h2>{meta.title}</h2>
          <p>{meta.desc}</p>
        </header>
        <div className="settings__body">{renderTab()}</div>
      </section>
    </div>
  );
}
