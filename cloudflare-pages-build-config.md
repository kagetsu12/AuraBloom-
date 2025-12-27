# Cloudflare Pages 正确构建配置

## ⚠️ 当前问题
使用 `npx wrangler deploy` 会将项目部署为 Workers，而不是 Pages。

## ✅ 正确的 Cloudflare Pages 配置

### 在 Cloudflare Dashboard 中设置：

1. **进入项目设置**
   - Cloudflare Dashboard → Pages → 你的项目
   - 点击 "Settings" → "Builds & deployments"

2. **构建配置**
   ```
   框架预设: None (或 Static Site)
   构建命令: (留空 - 不填任何内容)
   构建输出目录: / (根目录)
   根目录: / (根目录)
   ```

3. **环境变量**
   - 无需设置

4. **保存并重新部署**
   - 点击 "Save"
   - 手动触发一次新的部署

## 🔧 如果必须使用构建命令

如果 Cloudflare Pages 要求必须有构建命令，使用：

```bash
echo "Static site - no build needed"
```

或者创建一个空的构建脚本。

## 📝 注意事项

- **不要使用** `npx wrangler deploy` - 这是 Workers 的命令
- **静态网站** 不需要构建步骤
- **Pages 会自动检测** HTML/CSS/JS 文件
- **wrangler.jsonc** 文件可以保留，但 Pages 可能不会使用它

## ✅ 验证步骤

1. 删除构建命令
2. 保存配置
3. 触发新部署
4. 等待部署完成（通常 1-3 分钟）
5. 检查部署状态是否为 "Success"
6. 访问网站测试

