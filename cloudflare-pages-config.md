# Cloudflare Pages 部署配置说明

## 项目配置

这是一个静态网站项目，所有文件都在根目录。

## Cloudflare Pages 设置

### 构建配置
- **构建命令**: 留空（静态网站无需构建）
- **构建输出目录**: `/` (根目录)
- **根目录**: `/` (根目录)

### 环境变量
无需设置环境变量

### 自定义域名
确保在 Cloudflare Pages 中正确配置自定义域名 `aura-bloom.top`

## 文件说明

- `_redirects`: 处理路由重定向
- `_headers`: 设置安全响应头
- `wrangler.jsonc`: Cloudflare Workers/Pages 配置文件

## 部署检查清单

1. ✅ 确认所有 HTML 文件在根目录
2. ✅ 确认 assets 文件夹结构正确
3. ✅ 确认图片文件路径正确
4. ✅ 检查 DNS 设置指向 Cloudflare
5. ✅ 确认 SSL/TLS 设置为"完全"模式
6. ✅ 检查自定义域名绑定状态

## 故障排除

如果遇到 ERR_CONNECTION_CLOSED 错误：

1. 检查 Cloudflare Pages 部署状态
2. 验证自定义域名配置
3. 检查 DNS 记录是否正确
4. 确认 SSL/TLS 证书状态
5. 等待 DNS 传播（最多 24 小时）

