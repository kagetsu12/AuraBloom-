# Cloudflare Pages 部署命令配置

## 如果部署命令不能留空

### 正确的部署命令

对于 Cloudflare Pages，如果必须填写部署命令，使用：

```bash
npx wrangler pages deploy . --project-name=aurabloom
```

或者更简单的版本（如果项目名已自动识别）：

```bash
npx wrangler pages deploy .
```

## 配置说明

### 构建命令 (Build Command)
- **留空** 或使用：`echo "Static site - no build needed"`

### 部署命令 (Deployment Command) - 必须填写
使用以下命令之一：

**选项 1（推荐）：**
```bash
npx wrangler pages deploy . --project-name=aurabloom
```

**选项 2（如果项目名已配置）：**
```bash
npx wrangler pages deploy .
```

**选项 3（最小化命令）：**
```bash
echo "Deploying static site"
```

### 非生产分支部署命令
- **留空** 或使用与部署命令相同的命令

### 路径 (Path)
- 保持为：`/`

## 重要区别

- ❌ **错误**：`npx wrangler deploy` - 这是 Workers 的命令
- ✅ **正确**：`npx wrangler pages deploy .` - 这是 Pages 的命令

## 完整配置示例

```
构建命令: (留空)
部署命令: npx wrangler pages deploy . --project-name=aurabloom
非生产分支部署命令: (留空 或 与部署命令相同)
路径: /
```

