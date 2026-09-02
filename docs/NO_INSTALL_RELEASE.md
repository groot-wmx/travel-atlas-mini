# 不安装微信开发者工具的发布方案

旅图小程序可以在本机不安装微信开发者工具的情况下完成开发、预览包生成和代码上传。

## 日常开发

```bash
npm install
npm run check
npm run build:weapp
```

微信小程序产物生成在 `dist/`。视觉和主要交互通过项目的 H5 构建版本验收：

```bash
npm run build:h5
```

## 第一次配置微信 CI

需要小程序管理员在微信公众平台完成以下一次性操作：

1. 注册并认证“旅图”小程序，取得 AppID。
2. 在开发设置中生成“代码上传密钥”，下载 `private.key`。
3. 配置代码上传的 IP 白名单；若平台允许，也可按团队安全策略关闭白名单校验。
4. 将密钥保存在安全目录，不要放入项目或提交到 Git。

本地环境变量参考 `.env.ci.example`。

## 生成体验二维码

```bash
WECHAT_APP_ID=wx... \
WECHAT_PRIVATE_KEY_PATH=/安全目录/private.key \
npm run ci:preview
```

二维码输出到 `artifacts/preview.png`，可以直接发送给体验成员扫码测试。

## 上传开发版本

```bash
WECHAT_APP_ID=wx... \
WECHAT_PRIVATE_KEY_PATH=/安全目录/private.key \
MINI_VERSION=0.1.0 \
MINI_DESCRIPTION='旅图首个提审版本' \
npm run ci:upload
```

上传成功后，管理员在微信公众平台网页端完成版本体验、隐私指引、服务类目、备案、提交审核和审核通过后的正式发布。

## 安全要求

- `private.key`、AppSecret、用户 OpenID 不得提交到代码仓库。
- 微信 AppSecret 只能放在后端环境变量中，不能写入小程序代码。
- 正式发布前，攻略、景评、旅圈话题和图片必须接入内容安全检测。
