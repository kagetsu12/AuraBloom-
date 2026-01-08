# Cloudflare Pages 部署说明

## 问题诊断

如果遇到 ERR_CONNECTION_CLOSED 错误，请检查以下设置：

## Cloudflare Pages 项目设置

### 1. 构建配置
在 Cloudflare Pages 项目设置中：

- **框架预设**: None (或 Static Site)
- **构建命令**: **留空** (静态网站不需要构建)
- **构建输出目录**: `/` (根目录)
- **根目录**: `/` (根目录)

### 2. 环境变量
无需设置环境变量

### 3. 部署命令问题
当前使用的是 `npx wrangler deploy`，这会将项目部署为 Workers。

**对于 Cloudflare Pages，应该：**
- 删除构建命令，让 Pages 自动检测静态文件
- 或者使用 `wrangler pages deploy .` 命令

### 4. 自定义域名设置
1. 进入 Cloudflare Pages → 你的项目
2. 点击 "Custom domains"
3. 添加 `aura-bloom.top`
4. 确保 DNS 记录正确：
   - 类型：CNAME
   - 名称：aura-bloom.top (或 @)
   - 目标：你的 Pages 项目地址（如 `xxx.pages.dev`）

### 5. DNS 设置检查
在 Cloudflare DNS 设置中：
- 确保 `aura-bloom.top` 有 CNAME 记录指向 Pages
- SSL/TLS 模式设置为 "完全" 或 "完全（严格）"
- 代理状态应该是 "已代理"（橙色云）

## 解决方案

### 方案 1：使用 Pages 自动检测（推荐）
1. 在 Cloudflare Pages 项目设置中
2. 删除构建命令（留空）
3. 构建输出目录设置为 `/`
4. 保存并重新部署

### 方案 2：修改部署命令
如果必须使用构建命令，改为：
```
wrangler pages deploy . --project-name=aurabloom
```

## 验证步骤

1. ✅ 检查部署是否成功（绿色状态）
2. ✅ 验证自定义域名绑定状态
3. ✅ 检查 DNS 记录是否正确
4. ✅ 确认 SSL/TLS 证书已颁发
5. ✅ 等待 DNS 传播（最多 24 小时）

## 当前文件结构

```
/
├── index.html          # 主页
├── about.html          # 关于页面
├── contact.html         # 联系页面
├── products.html        # 产品页面
├── post-*.html         # 文章页面
├── assets/             # 静态资源
│   ├── css/
│   └── js/
├── image/              # 图片
├── wrangler.jsonc      # Cloudflare 配置
└── _headers            # 安全头配置
```

## 故障排除

如果仍然无法访问：

1. **检查部署日志** - 查看是否有错误
2. **测试 Pages 默认域名** - 访问 `xxx.pages.dev` 看是否正常
3. **清除浏览器缓存** - 尝试无痕模式访问
4. **检查防火墙/代理** - 确保没有阻止连接
5. **联系 Cloudflare 支持** - 如果以上都正常

