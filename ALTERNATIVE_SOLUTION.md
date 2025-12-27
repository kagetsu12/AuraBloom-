# Cloudflare Pages 配置替代方案

## 如果所有命令都报 "Invalid request body" 错误

### 可能的原因
1. Cloudflare Pages 项目类型设置错误
2. 项目可能被创建为 Workers 而不是 Pages
3. 需要检查项目的其他设置

## 解决方案

### 方案 1：检查项目类型

1. 在 Cloudflare Dashboard 中
2. 进入 **Pages** → 查看项目列表
3. 确认项目确实在 **Pages** 下，而不是 **Workers**
4. 如果项目在 Workers 下，需要删除并重新在 Pages 中创建

### 方案 2：重新创建 Pages 项目

如果当前项目配置有问题，可以：

1. **删除当前项目**（如果可能）
2. **重新创建 Pages 项目**：
   - 进入 Cloudflare Dashboard → Pages
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 选择你的 GitHub 仓库
   - 在构建设置中：
     - Framework preset: **None**
     - Build command: **留空**
     - Build output directory: **留空** 或 `/`
   - 点击 "Save and Deploy"

### 方案 3：使用 Cloudflare Pages 的自动检测

Cloudflare Pages 应该能够自动检测静态网站，不需要任何构建命令。

尝试：
1. **完全清空所有命令字段**
2. **只设置路径为 `/`**
3. 如果系统要求必须填写，尝试输入一个空格 ` ` 或单个字符 `a`

### 方案 4：检查项目设置的其他选项

在项目设置中检查：
- **Environment variables** - 确保没有冲突的变量
- **Custom domains** - 检查域名配置
- **Deployments** - 查看之前的部署历史，看是否有成功的部署

### 方案 5：使用 GitHub Actions 部署

如果 Cloudflare Pages 界面一直有问题，可以：

1. 在 GitHub 仓库中创建 `.github/workflows/deploy.yml`
2. 使用 GitHub Actions 自动部署到 Cloudflare Pages

### 方案 6：联系 Cloudflare 支持

如果以上都不行，可能是 Cloudflare 平台的问题：
- 检查 Cloudflare 状态页面
- 联系 Cloudflare 支持
- 或者等待一段时间后重试

## 临时解决方案

如果急需部署，可以考虑：
1. 使用其他静态网站托管服务（如 Vercel、Netlify）
2. 或者使用 Cloudflare Workers 手动部署静态文件

## 检查清单

- [ ] 确认项目在 Pages 下，不在 Workers 下
- [ ] 尝试完全清空所有命令字段
- [ ] 检查是否有其他必填字段未填写
- [ ] 尝试刷新页面后重新配置
- [ ] 检查浏览器控制台是否有 JavaScript 错误
- [ ] 尝试使用不同的浏览器
- [ ] 检查 Cloudflare 账户权限

