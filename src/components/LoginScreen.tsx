import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { WindowControls } from "./WindowControls";

type LoginScreenProps = {
  onSuccess: () => void;
};

export function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setError("");
    if (account.trim() !== "123456" || password !== "123456") {
      setError("账号或密码错误。测试账号与密码均为 123456。");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 650);
  };

  return (
    <div className="login">
      <header className="login__topbar" data-tauri-drag-region>
        <div className="login__brand">
          <span className="login__brand-mark">D</span>
          <span className="login__brand-name">DSH Launcher</span>
        </div>
        <WindowControls allowMaximize={false} />
      </header>

      <div className="login__art" aria-hidden="true">
        <span className="login__art-word">DSH</span>
        <span className="login__grid" />
        <span className="login__orb login__orb--one" />
        <span className="login__orb login__orb--two" />
      </div>

      <div className="login__content">
        <section className="login__copy">
          <span className="login__eyebrow">NEXT-GEN GAME LAUNCHER</span>
          <h1>
            回到你的
            <br />
            游戏世界
          </h1>
          <p>一个账号，连接所有已安装的游戏、好友与下载任务。登录后直接回到上次离开的地方。</p>
          <div className="login__stats">
            <span>
              <strong>6</strong>款游戏
            </span>
            <span>
              <strong>3</strong>个下载任务
            </span>
            <span>
              <strong>42</strong>位好友
            </span>
          </div>
        </section>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__head">
            <h2>账号登录</h2>
            <span className="login-card__badge">测试模式</span>
          </div>
          <p className="login-card__hint">测试账号与密码均为 123456</p>

          <label className="field">
            <span>账号</span>
            <div className="field__control">
              <Icon name="user" size={16} />
              <input
                value={account}
                onChange={(event) => {
                  setAccount(event.target.value);
                  if (error) setError("");
                }}
                placeholder="请输入账号"
                autoComplete="username"
                autoFocus
              />
            </div>
          </label>

          <label className="field">
            <span>密码</span>
            <div className="field__control">
              <Icon name="lock" size={16} />
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError("");
                }}
                placeholder="请输入密码"
                autoComplete="current-password"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
            </div>
          </label>

          <div className="login-card__row">
            <label className="checkbox">
              <input type="checkbox" defaultChecked />
              记住账号
            </label>
            <button type="button" className="link-btn">
              忘记密码？
            </button>
          </div>

          {error && <div className="login-card__error">{error}</div>}

          <button type="submit" className="btn btn--primary login-card__submit" disabled={loading}>
            {loading ? "正在登录…" : "登录"}
            {!loading && <Icon name="arrowRight" size={15} />}
          </button>

          <p className="login-card__foot">
            登录即表示同意《用户协议》与《隐私政策》
            <br />
            扫码登录将在接入后端后开放
          </p>
        </form>
      </div>

      <div className="login__footer">DSH LAUNCHER v0.1.0 · WINDOWS</div>
    </div>
  );
}
