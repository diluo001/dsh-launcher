import { useState, type FormEvent } from "react";
import { Icon } from "../components/Icon";
import { giftPacks, type GiftPack } from "../data/gifts";

type GiftPageProps = {
  onNotify: (message: string) => void;
};

export function GiftPage({ onNotify }: GiftPageProps) {
  const [claimed, setClaimed] = useState<Set<string>>(() => new Set());
  const [code, setCode] = useState("");

  const remaining = giftPacks.length - claimed.size;

  const claim = (gift: GiftPack) => {
    if (claimed.has(gift.id)) return;
    setClaimed((prev) => new Set(prev).add(gift.id));
    onNotify(`已领取「${gift.name}」：${gift.items.join("、")}`);
  };

  const redeem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = code.trim();
    if (!value) {
      onNotify("请输入兑换码");
      return;
    }
    setCode("");
    onNotify(`兑换成功：${value.toUpperCase()} · 星尘 ×500`);
  };

  return (
    <div className="page gifts">
      <header className="gifts__head">
        <div>
          <h2>礼包中心</h2>
          <p>
            {remaining > 0
              ? `${remaining} 个礼包待领取，领取后发放到游戏内邮箱`
              : "全部礼包已领取，兑换码仍可使用"}
          </p>
        </div>

        <form className="gifts__redeem" onSubmit={redeem}>
          <Icon name="gift" size={15} />
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="输入兑换码"
            aria-label="兑换码"
            maxLength={32}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit">兑换</button>
        </form>
      </header>

      <div className="gifts__grid">
        {giftPacks.map((gift) => {
          const isClaimed = claimed.has(gift.id);
          return (
            <article
              key={gift.id}
              className={`gift-tile${isClaimed ? " is-claimed" : ""}`}
            >
              <div className="gift-tile__top">
                <span className="gift-tile__icon">
                  <Icon name={gift.icon} size={20} />
                </span>
                <span className="gift-tile__tag">{gift.tag}</span>
              </div>

              <h3>{gift.name}</h3>
              <p>{gift.desc}</p>

              <div className="gift-tile__items">
                {gift.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="gift-tile__foot">
                <span className="gift-tile__expiry">
                  <Icon name="clock" size={11} />
                  {gift.expiry}
                </span>
                <button
                  type="button"
                  className="gift-tile__btn"
                  disabled={isClaimed}
                  onClick={() => claim(gift)}
                >
                  {isClaimed ? "已领取" : "领取"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
