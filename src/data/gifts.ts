import type { IconName } from "../components/Icon";

export type GiftPack = {
  id: string;
  name: string;
  desc: string;
  items: string[];
  tag: string;
  expiry: string;
  icon: IconName;
};

/** 礼包中心的模拟数据，后续换成账号接口返回的可领取列表。 */
export const giftPacks: GiftPack[] = [
  {
    id: "starter",
    name: "新手启航礼包",
    desc: "踏入星海的第一份补给，绑定账号即可领取。",
    items: ["星尘 ×500", "跃迁燃料 ×3"],
    tag: "新手",
    expiry: "长期有效",
    icon: "spark",
  },
  {
    id: "daily",
    name: "每日补给",
    desc: "每天登录都能领一次，刷新时间为早上 5 点。",
    items: ["体力 ×60", "信用点 ×2000"],
    tag: "每日",
    expiry: "每日 05:00 刷新",
    icon: "clock",
  },
  {
    id: "version",
    name: "1.8.4 版本礼包",
    desc: "版本更新限定，包含深空回响涂装与专属徽章。",
    items: ["限定涂装「深空回响」", "回响徽章"],
    tag: "限时",
    expiry: "剩 6 天",
    icon: "gift",
  },
  {
    id: "weekend",
    name: "周末在线礼包",
    desc: "周末累计在线满 2 小时，即可领取强化补给。",
    items: ["强化石 ×10", "金币 ×5000"],
    tag: "周末",
    expiry: "周日 23:59 截止",
    icon: "gamepad",
  },
  {
    id: "return",
    name: "回归者礼包",
    desc: "连续 14 天未登录的玩家专属，助力快速追回进度。",
    items: ["回响凭证 ×1", "星尘 ×800"],
    tag: "回归",
    expiry: "回归后 14 天内",
    icon: "heart",
  },
  {
    id: "collab",
    name: "联动限定礼包",
    desc: "与《深空信号》联动发放，头像框与涂装碎片限时获取。",
    items: ["联动头像框", "涂装碎片 ×5"],
    tag: "联动",
    expiry: "剩 2 天",
    icon: "shield",
  },
];
