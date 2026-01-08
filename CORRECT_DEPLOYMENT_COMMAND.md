# 正确的部署命令

## 错误信息分析

错误信息明确指出：
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

## ✅ 正确的配置

### 构建命令 (Build Command)
```
true
```
或留空

### 部署命令 (Deployment Command) - 必须修改
```
npx wrangler pages deploy .
```

**关键区别：**
- ❌ 错误：`npx wrangler deploy` - Workers 命令
- ✅ 正确：`npx wrangler pages deploy .` - Pages 命令

注意 `pages` 关键字和末尾的 `.`（表示当前目录）

### 非生产分支部署命令
```
npx wrangler pages deploy .
```
或留空

### 路径 (Path)
```
/
```

## 完整配置

在 Cloudflare Pages 构建配置中：

1. **构建命令**：`true` 或留空
2. **部署命令**：`npx wrangler pages deploy .`
3. **非生产分支部署命令**：`npx wrangler pages deploy .` 或留空
4. **路径**：`/`

保存后应该可以成功部署！

