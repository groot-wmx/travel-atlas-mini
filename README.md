# 旅图 Travel Atlas

> 每一次抵达，都成为地图上的故事。

旅图是一套面向微信小程序和网页的旅行社区产品初稿，围绕“发现景点与景评、规划旅行、记录攻略、加入旅圈”展开。首页从中国地图开始，内容范围覆盖全球景点。

## 当前功能

- 中国地图与精选目的地首页
- 国内、海外目的地搜索与筛选
- 景点详情、评分和 Mock 景评
- 想去、去过、加入行程
- 日历式旅行规划
- 攻略、照片和景评发布页面
- 旅圈列表、话题和关注
- 个人收藏与本地数据展示

当前版本使用 Mock 数据和本地存储，暂未接入账号、后端数据库和真实图片上传。

## 技术栈

- Taro 4.2.1
- React 18
- TypeScript
- Sass / SCSS
- Vite
- 微信小程序 + H5 双端构建

## 本地运行

```bash
npm ci
npm run check
```

网页版本：

```bash
npm run build:h5
python3 -m http.server 4174 --directory dist-h5
```

打开：`http://localhost:4174/#/pages/index/index`

微信小程序版本：

```bash
npm run build:weapp
```

构建产物位于 `dist/`。

## 项目文档

- [跨电脑复制与开发指南](docs/跨电脑复制开发指南.md)
- [不安装微信开发者工具的发布方案](docs/NO_INSTALL_RELEASE.md)

## 安全说明

- 不要提交微信代码上传密钥、AppSecret、访问令牌或真实用户数据。
- 正式上线前需要接入登录、后端数据库、图片存储和内容安全审核。

