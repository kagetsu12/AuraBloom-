# 修复 "Hello world" 问题

## 问题分析

网站显示 "Hello world" 而不是实际内容，说明：
- 部署成功了，但部署成了 Workers 而不是静态文件
- "Hello world" 是 Cloudflare Workers 的默认输出

## 可能的原因

1. `wrangler.jsonc` 文件让 Pages 误以为是 Workers 项目
2. 部署配置不正确
3. Pages 没有正确识别静态文件

## 解决方案

### 方案 1：删除 wrangler.jsonc（推荐）

对于纯静态网站，可能不需要 `wrangler.jsonc` 文件。

1. 删除 `wrangler.jsonc` 文件
2. 确保 Cloudflare Pages 构建配置：
   - 构建命令：留空
   - 部署命令：留空
   - 路径：`/`
3. 重新部署

### 方案 2：检查 Pages 项目设置

1. 在 Cloudflare Dashboard → Pages → 你的项目
2. 确认项目类型是 "Pages" 而不是 "Workers"
3. 检查 "Settings" → "Builds & deployments"
4. 确保没有使用 Workers 相关的配置

### 方案 3：重新创建 Pages 项目

如果当前项目配置有问题：
1. 删除当前项目
2. 重新创建 Pages 项目
3. 选择 "Connect to Git"
4. 选择你的 GitHub 仓库
5. 在构建设置中：
   - Framework preset: **None**
   - Build command: **留空**
   - Build output directory: **留空**
   - Root directory: **留空** 或 `/`
6. 不要填写任何部署命令

## 验证步骤

1. 删除或重命名 `wrangler.jsonc`
2. 推送代码到 GitHub
3. 在 Cloudflare Pages 中触发新部署
4. 等待部署完成
5. 访问网站，应该显示完整的 AuraBloom 网站

