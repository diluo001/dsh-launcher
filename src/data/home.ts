import type { CoverKey } from "../types";

export type HeroSlide = {
  cover: CoverKey;
  eyebrow: string;
  title: string;
  sub: string;
};

export type Announcement = {
  id: string;
  tag: string;
  tone: "update" | "event" | "system";
  title: string;
  date: string;
};

export type CommunityPost = {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  likes: string;
  comments: string;
};

export type Activity = {
  id: string;
  cover: CoverKey;
  tag: string;
  title: string;
  desc: string;
  time: string;
};

export const heroSlides: HeroSlide[] = [
  {
    cover: "void",
    eyebrow: "01 / 坍缩星海",
    title: "在星海尽头，听见回响",
    sub: "ECHO OF THE VOID",
  },
  {
    cover: "deep",
    eyebrow: "02 / 深蓝航道",
    title: "下潜，直到信号重新出现",
    sub: "THE VOID REMEMBERS",
  },
  {
    cover: "starport",
    eyebrow: "03 / 星港夜航",
    title: "每一次选择，都会改写航道",
    sub: "ECHO OF THE VOID",
  },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    tag: "更新",
    tone: "update",
    title: "1.8.4 版本「深空回响」已上线",
    date: "10-18",
  },
  {
    id: "a2",
    tag: "活动",
    tone: "event",
    title: "深空信号联动活动开启",
    date: "10-16",
  },
  {
    id: "a3",
    tag: "维护",
    tone: "system",
    title: "10 月 20 日 04:00 停机维护",
    date: "10-15",
  },
  {
    id: "a4",
    tag: "公告",
    tone: "system",
    title: "赛季通行证奖励调整说明",
    date: "10-12",
  },
  {
    id: "a5",
    tag: "活动",
    tone: "event",
    title: "秋季赛季通行证现已上线",
    date: "10-10",
  },
  {
    id: "a6",
    tag: "公告",
    tone: "system",
    title: "客户端 1.8.3 已知问题修复",
    date: "10-08",
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "p1",
    author: "夜行者",
    avatar: "夜",
    time: "12 分钟前",
    text: "终于在深空回响里打通了无伤航道，这个 BOSS 的节奏太爽了。",
    likes: "24",
    comments: "6",
  },
  {
    id: "p2",
    author: "星港旅人",
    avatar: "星",
    time: "40 分钟前",
    text: "有没有人一起刷本周的联合行动？缺一个奶位，晚上八点开。",
    likes: "11",
    comments: "9",
  },
  {
    id: "p3",
    author: "熔火之心",
    avatar: "熔",
    time: "1 小时前",
    text: "分享一套跃迁燃料的刷法，实测一小时能攒 30 个。",
    likes: "38",
    comments: "12",
  },
  {
    id: "p4",
    author: "新叶",
    avatar: "新",
    time: "2 小时前",
    text: "刚入坑，求一份深空回响的键位设置参考。",
    likes: "7",
    comments: "15",
  },
  {
    id: "p5",
    author: "深空电台",
    avatar: "电",
    time: "3 小时前",
    text: "本周社区精选：三套无伤航道路线整理。",
    likes: "56",
    comments: "21",
  },
];

export const activities: Activity[] = [
  {
    id: "e1",
    cover: "starport",
    tag: "联动",
    title: "深空信号 · 联动活动",
    desc: "完成联动任务，领取限定涂装与头像框",
    time: "剩 2 天",
  },
  {
    id: "e2",
    cover: "iron",
    tag: "赛季",
    title: "1.8 赛季通行证",
    desc: "本周双倍经验，周末登录额外领取补给",
    time: "剩 6 天",
  },
  {
    id: "e3",
    cover: "ember",
    tag: "周末",
    title: "周末双倍经验",
    desc: "周六周日登录，经验与信用点双倍",
    time: "剩 4 天",
  },
];
