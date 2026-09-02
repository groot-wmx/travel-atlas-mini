const fs = require('node:fs')
const path = require('node:path')
const ci = require('miniprogram-ci')

const action = process.argv[2]
const appid = process.env.WECHAT_APP_ID
const privateKeyPath = process.env.WECHAT_PRIVATE_KEY_PATH
const version = process.env.MINI_VERSION || '0.1.0'
const description = process.env.MINI_DESCRIPTION || '旅图小程序体验版'
const robot = Number(process.env.WECHAT_CI_ROBOT || 1)

if (!['preview', 'upload'].includes(action)) {
  throw new Error('Usage: node scripts/miniprogram-ci.cjs <preview|upload>')
}
if (!appid || !privateKeyPath) {
  throw new Error('请先设置 WECHAT_APP_ID 和 WECHAT_PRIVATE_KEY_PATH')
}
if (!fs.existsSync(privateKeyPath)) {
  throw new Error(`找不到微信代码上传密钥：${privateKeyPath}`)
}

const root = path.resolve(__dirname, '..')
const projectConfig = path.join(root, 'project.config.json')
const config = JSON.parse(fs.readFileSync(projectConfig, 'utf8'))
config.appid = appid
fs.writeFileSync(projectConfig, `${JSON.stringify(config, null, 2)}\n`)

const project = new ci.Project({ appid, type: 'miniProgram', projectPath: root, privateKeyPath, ignores: ['node_modules/**/*'] })

async function run () {
  if (action === 'upload') {
    await ci.upload({ project, version, desc: description, robot, setting: { es6: true, minify: true, autoPrefixWXSS: true } })
    console.log(`旅图小程序 ${version} 已上传到微信开发版本`)
    return
  }
  const artifacts = path.join(root, 'artifacts')
  fs.mkdirSync(artifacts, { recursive: true })
  const qrcode = path.join(artifacts, 'preview.png')
  await ci.preview({ project, desc: description, robot, qrcodeFormat: 'image', qrcodeOutputDest: qrcode, setting: { es6: true, minify: true, autoPrefixWXSS: true } })
  console.log(`体验二维码已生成：${qrcode}`)
}

run().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
