# 🔐 API密钥安全设置指南

## ⚠️ 重要安全提醒

**请绝对不要在代码中硬编码任何真实的API密钥！**

## 🔧 正确的设置方法

### 方法1: 环境变量设置（推荐）

```bash
# 临时设置（当前shell会话有效）
export DOUBAO_API_KEY="your-actual-api-key"

# 永久设置（添加到shell配置文件）
echo 'export DOUBAO_API_KEY="your-actual-api-key"' >> ~/.zshrc
source ~/.zshrc
```

### 方法2: .env文件设置

```bash
# 1. 在项目根目录创建 .env 文件
echo 'DOUBAO_API_KEY=your-actual-api-key' > .env

# 2. 启动时自动加载
npx deepcode-cli@latest
```

### 方法3: 交互式输入

运行快速开始脚本，会提示你输入API密钥：
```bash
./快速开始.sh
```

## 🎯 获取API密钥

### 豆包API密钥
1. 访问 [字节跳动火山方舟](https://console.volcengine.com/ark)
2. 注册/登录账号
3. 创建应用
4. 获取API Key

### 其他模型API密钥
- **Gemini**: [Google AI Studio](https://aistudio.google.com/apikey)
- **OpenAI**: [OpenAI Platform](https://platform.openai.com/api-keys)
- **Claude**: [Anthropic Console](https://console.anthropic.com/)

## 🛡️ 安全最佳实践

1. **永远不要**在代码仓库中提交真实的API密钥
2. **使用环境变量**或安全的配置文件存储密钥
3. **定期轮换**API密钥
4. **限制API密钥权限**，只给予必要的访问权限
5. **监控API使用情况**，及时发现异常

## 📝 .env文件示例

创建 `.env` 文件（不要提交到git）：

```bash
# 豆包API密钥
DOUBAO_API_KEY=your-actual-doubao-api-key

# 其他可选配置
# GEMINI_API_KEY=your-gemini-key
# DEBUG=true
```

## 🚨 如果密钥泄露了怎么办？

1. **立即撤销**泄露的API密钥
2. **生成新的**API密钥
3. **更新环境变量**为新密钥
4. **检查账单**是否有异常使用
5. **修改代码**，确保不再硬编码密钥

## ✅ 验证设置

运行以下命令验证密钥是否正确设置：

```bash
# 检查环境变量
echo $DOUBAO_API_KEY

# 测试DeepCode CLI
npx deepcode-cli@latest --help
```

---

**记住：保护你的API密钥就像保护你的密码一样重要！** 🔐
