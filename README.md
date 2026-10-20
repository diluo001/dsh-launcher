# DSH Launcher

基于 **Tauri 2 + React 19 + TypeScript + Vite** 的 PC 游戏登录器。当前是项目骨架，下一步接入登录、下载中心与后端。

## 环境要求

- Windows 10 1803+ / Windows 11
- Node.js 24 LTS
- Rust stable，目标 `x86_64-pc-windows-msvc`
- Visual Studio Build Tools（勾选「使用 C++ 的桌面开发」）
- WebView2 Runtime（Win11 通常已自带）

## 开发

最省事的方式：双击 `dev.cmd`。

或者在 PowerShell 里：

```powershell
cd 项目目录
npm.cmd run tauri dev
```

如果 PowerShell 报 `npm.ps1 无法加载 / 禁止运行脚本`，是执行策略拦截；用 `npm.cmd`（或 `dev.cmd`）即可绕过，也可以执行 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` 后重开终端。

`dev.cmd` 会自动复用工作区里的 `..\.cargo-home` 缓存，避免重复拉取 Rust 依赖。首次编译约 5–10 分钟，之后增量编译很快。

开发模式是动态的：改 `src/` 下的 React/CSS 会由 Vite 热更新；改 `src-tauri/` 下的 Rust 会自动重编译并重启窗口。登录状态存在 `sessionStorage`，前端热更新会保留，Rust 重启后会回到登录页。

## 登录

测试账号与密码均为 `123456`。主窗口固定 1280×800，不可缩放或最大化；登录页和主界面右上角都只有主题、最小化、关闭。

## 首页

首页改为 2×2 信息面板：左上角是游戏轮播图（5 秒自动切换，可点圆点），右上角是活动卡片，左下角是社区帖子预览，右下角是公告列表。上下两行的左右宽度不同：上行约 `1.75 : 1`，下行约 `1.03 : 1`，接近手绘稿里的比例。除轮播外，其余三块都收紧了行高和字号；社区只保留作者、时间和正文，不显示赞/评论。窗口最底部是一条通栏操作条：左侧是游戏标识，右侧是游戏状态（已安装、版本、上次游玩、占用空间）和「启动游戏」按钮。面板内容在 `src/data/home.ts`，状态仍在 `homeFeatured`。

## 礼包

左侧导航的「礼包」页展示 6 个礼包：新手、每日、限时、周末、回归、联动，每个礼包包含图标、标签、说明、奖励项与有效期；右上角是兑换码输入。领取后卡片置灰、计数减少并弹出提示，兑换码只做前端提示、未校验。数据在 `src/data/gifts.ts`，领取状态保存在页面内存中，刷新后重置。

## 界面风格

右上角调色板按钮（最小化左侧）内置 18 套，按暖色、绿色、冷色、紫粉、中性分组：熔火、余烬、落日、酒红、赤瞳、森屿、深渊、终端、极光、冰霜、雾蓝、夜航、赛博、虚空、霓虹、樱、钛银、王朝。每套同时改变强调色、底色、面板色与登录页背景，不只是换一条高亮线。选择写入 `localStorage`，重启后保留；登录页和主界面共用同一套主题。

## 设置

设置页分六组：账号、通用、下载、外观、网络、关于。修改会自动写入 `localStorage`（`dsh-settings`），主题写入 `dsh-theme`。

- 已接真实逻辑：主题切换、减少动效、界面密度、退出登录、设置持久化。
- 仍是占位：开机自启、最小化到托盘、实际下载目录选择、代理/CDN、检查更新——这些需要 Tauri 插件或后端接口。

## 构建

双击 `build.cmd`，或：

```powershell
npm.cmd run tauri build
```

安装包输出在 `src-tauri/target/release/bundle/`，默认生成 NSIS 安装程序与 MSI。

## 目录

```text
launcher/
├─ src/                  # React 前端
│  ├─ App.tsx
│  └─ main.tsx
├─ src-tauri/            # Tauri 外壳与 Rust 核心
│  ├─ src/lib.rs         # 命令注册入口
│  ├─ capabilities/      # IPC 权限白名单
│  ├─ tauri.conf.json    # 窗口、构建、打包配置
│  └─ Cargo.toml
├─ vite.config.ts
└─ package.json
```

## 约定

- 包管理器使用 **npm**（本机 pnpm 的 junction 布局与 Vite 8 存在解析冲突，已改用 npm 的扁平安装）。
- 渲染层不直接访问文件系统与注册表，敏感操作统一走 `src-tauri` 的白名单命令。
- 新增 Tauri 命令后，同步在 `src-tauri/capabilities/default.json` 中登记权限。

## 常见问题

- `npm.ps1 无法加载`：用 `npm.cmd` 或 `dev.cmd`，或执行 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`。
- 启动时报 `Failed to setup app: 拒绝访问`：开发模式下 WebView2 数据目录固定在 `src-tauri/target/debug/.webview2`（见 `src-tauri/src/lib.rs`），发布模式用 `%LOCALAPPDATA%\com.dsh.launcher\WebView2`。如果仍失败，先确认不是低完整性/沙箱终端（`whoami /groups | findstr "S-1-16"` 应为 8192），再把项目目录加入杀毒软件白名单。
- 普通权限仍失败时，再把项目目录和 `msedgewebview2.exe` 加入杀毒软件白名单。
- 端口 1420 被占用：关掉残留的 `node.exe`，或同时修改 `vite.config.ts` 与 `tauri.conf.json` 里的端口。

## 下一步

1. 设置项接入 Tauri 插件（开机自启、托盘、目录选择）
2. 扫码登录与令牌存储（Windows Credential Manager / DPAPI）
3. 分片下载、SHA-256 校验与增量更新
4. 自动更新签名与灰度发布
