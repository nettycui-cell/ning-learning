# Ning Learning Hub

手机优先的个人学习网站。固定地址：https://nettycui-cell.github.io/ning-learning/

## 使用

- Today：每日三项任务、已掌握句数、收藏数和学习记录。
- German Alltag：14 个生活场景，1028 条德英练习句；按对话日期、类型、关键词和收藏/未掌握筛选。德语自测、揭晓英文、德语语音选择、逐句掌握。
- A1–A2 Deutsch：11 个新增单元，input → 词汇句型 → 15–30 分钟朗读 → 3 题自动批改 → review。
- MBA Daily：7 个新增英文精读单元，附官方原文来源、原创日常商业案例、summary、词汇、框架和思考笔记。不是实时新闻源。
- 每日学习从 2026-09-23 起按日期轮换；后续轮次明确显示为复习。用户可以选择任意已有单元，任务和笔记按实际学习日期保存。
- 收藏句和到期句进入复习队列；自测后普通句次日再复习，已掌握句 7 天后再复习。

## 手机主屏幕与离线

iPhone：Safari 打开网址 → 分享 → 添加到主屏幕。Android：Chrome 菜单 → 安装应用 / 添加到主屏幕。
首次联网加载成功后，核心教材和学习功能可离线使用。外部阅读原文需要联网，朗读使用设备已安装的 German / Deutsch 语音；菜单中的“德语朗读设置”可选择并测试语音。若列表为空，请先在系统语音设置中下载德语语音。

## 进度

进度仅保存在当前浏览器 localStorage，不自动跨设备同步。菜单里的“导出进度”保存 JSON 备份；“导入备份”合并记录并对同一条记录保留较新版本。清除浏览器数据、换设备或更换网址前请导出。导入前的旧数据会保留在 localStorage 的 `ning-learning-v1-before-import` 键中。

## 维护

纯静态 HTML / CSS / JavaScript，无安装依赖、API 密钥或后端费用。直接编辑后更新 main 分支即可由 GitHub Pages 发布。

- `data.js`：历史场景与句对。保留已有场景和句子的 id，避免进度失联。
- `curriculum.js`：德语与 MBA 课程。每日课表用 app.js 中固定 ID 顺序轮换，追加课程不会改动旧安排。若要让新课程进入每日计划，应新增带生效日期的课表版本，保留旧日期映射。
- `app.js`：导航、日期安排、学习进度、测验、朗读、备份。
- `sw.js`：离线资源清单；改动资源后提高 CACHE 版本后缀。
- `library.html`：无需 JavaScript 的静态场景阅读版。

日期为原对话日期。场景中的价格、路线和个人信息例句是语言练习，不代表实时运营信息或用户真实资料。原对话中的具体姓名和取件地址已替换为占位符。

## 本地运行

在此目录运行 `python3 -m http.server 4173`，然后打开 `http://localhost:4173`。直接双击 HTML 也能阅读和练习，但安装与离线缓存需要 HTTP 本地服务或 HTTPS 固定网址。

GitHub Pages 发布设置：Settings → Pages → Deploy from a branch → main → /(root)。

## 内容来源

德语场景整理自用户提供的“德英语学习daily”对话。A1–A2 和 MBA 练习为新增教学内容。
MBA 参考原文（2026-09-23 核对）：Amazon 1997 shareholder letter、Harvard Business School The Five Forces、ECB What is inflation?。页面内均保留直达来源的链接；案例标注 Original practice case。

## 2026-09-24 更新

新增和扩充 Thalia 取书与逛店（68 句）、Trampolin 蹦床课（53 句）、REWE（92 句）、dm（46 句）。首页列出本次场景，支持按更新日期筛选、按环节跳转。句子 ID 保留，历史学习进度继续有效。REWE 原收银练习的 PAYBACK 表达已更新为 REWE Bonus。

朗读显式选择德语 voice；保持点击时同步启动，避免延迟播放；支持语速、设备语音重载、停止与 Google Translate 备用听音。语音选择与语速随进度备份导入导出。本机语音可离线使用，在线语音和备用听音需联网。

实现参考：[Web Speech voice](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice)、[voiceschanged](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event)。商店信息核对：[REWE Bonus](https://www.rewe.de/payback/)、[dm PAYBACK](https://www.dm.de/services/payback/punkte-sammeln-3501606)。问答均为原创语言练习。
