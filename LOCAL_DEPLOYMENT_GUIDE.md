# 🚀 DeepCode CLI 本地部署指南

本指南将帮你完整部署DeepCode CLI项目并测试豆包模型功能。

## 📋 环境要求

### 必需环境
- **Node.js**: >= 20.0.0 （当前检测到: Node.js v24.11.0 ✅）
- **npm**: 最新版本
- **Git**: 用于代码管理

### 验证环境
```bash
node --version    # 应该 >= 20.0.0
npm --version     # 应该是最新版本
```

## 🔧 第一步：项目构建

### 1.1 安装依赖
```bash
cd /Users/xiaogaiguo/GolandProjects/gemini/gemini-cli

# 清理npm缓存（解决可能的权限问题）
npm cache clean --force

# 安装项目依赖
npm install
```

### 1.2 构建项目
```bash
# 方式1: 完整构建（推荐）
npm run build

# 方式2: 如果遇到权限问题，使用bundle方式
npm run bundle
```

## 🌟 第二步：配置豆包模型

### 2.1 设置API密钥
```bash
# 设置豆包API密钥（已提供的测试密钥）
export DOUBAO_API_KEY="7d06f6e9-3bdb-4fa3-91df-80ef487f7a61"

# 验证设置
echo $DOUBAO_API_KEY
```

### 2.2 验证豆包API连接
```bash
# 运行快速测试脚本
node quick-test-doubao.js
```

**期望输出**：
```
🚀 快速测试豆包模型功能
✅ 成功! 豆包回复: "你好呀！我是豆包..."
📊 测试结果: 5/5 成功
🎉 豆包模型工作正常！
```

## 🚀 第三步：启动DeepCode CLI

### 3.1 检查可执行文件
```bash
# 检查构建产物
ls -la bundle/

# 应该看到：
# gemini.js 或 deepcode.js
```

### 3.2 启动方式

#### 方式1: 直接运行（推荐）
```bash
# 使用npm脚本启动
npm run start -- --auth-type doubao-api-key
```

#### 方式2: 直接执行bundle
```bash
# 如果bundle目录存在可执行文件
node bundle/gemini.js --auth-type doubao-api-key
```

#### 方式3: 开发模式启动
```bash
# 开发模式（如果构建有问题）
npm run build-and-start -- --auth-type doubao-api-key
```

## 🧪 第四步：全面测试豆包模型

### 4.1 基础功能测试

**启动CLI后，在交互界面中测试：**

```bash
# 1. 中文对话测试
> 你好，请介绍一下你自己

# 2. 代码生成测试  
> 请写一个Python函数计算斐波那契数列

# 3. 代码解释测试
> 解释这段代码的作用：def factorial(n): return 1 if n <= 1 else n * factorial(n-1)

# 4. 问题解答测试
> 什么是递归？请举个例子

# 5. 数学计算测试
> 计算 25 * 4 + 10 等于多少？
```

### 4.2 高级功能测试

```bash
# 1. 模型切换测试
> /model doubao-seed-1-6-251015

# 2. 帮助命令测试
> /help

# 3. 对话历史测试
> /history

# 4. 清除对话测试
> /clear
```

### 4.3 多模态测试（如果支持）

```bash
# 上传图片并询问
> 请分析这张图片：[拖拽图片到终端]
```

## 🔍 第五步：故障排除

### 5.1 常见问题解决

#### 问题1: 构建失败
```bash
# 解决方案：清理并重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 问题2: 权限错误
```bash
# 解决方案：修复npm权限
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
```

#### 问题3: 豆包API调用失败
```bash
# 检查网络连接
curl -I https://ark.cn-beijing.volces.com

# 检查API密钥
echo $DOUBAO_API_KEY

# 重新设置API密钥
export DOUBAO_API_KEY="7d06f6e9-3bdb-4fa3-91df-80ef487f7a61"
```

#### 问题4: CLI无法启动
```bash
# 尝试不同启动方式
npm run start
# 或
node scripts/start.js --auth-type doubao-api-key
```

### 5.2 调试模式

```bash
# 启用调试模式
DEBUG=1 npm run start -- --auth-type doubao-api-key

# 或使用调试脚本
npm run debug -- --auth-type doubao-api-key
```

## 📊 第六步：性能测试

运行性能测试脚本：

```bash
# 运行完整集成测试
node test-doubao-integration.js

# 期望输出：
# 📊 测试结果: 3/3 测试通过
# 🎉 所有测试通过！豆包模型集成成功！
```

## 🎯 第七步：使用建议

### 推荐使用场景
1. **代码生成**: 让豆包帮你写代码
2. **代码解释**: 理解复杂代码逻辑
3. **调试帮助**: 分析错误和问题
4. **文档生成**: 自动生成代码注释
5. **学习辅助**: 解释编程概念

### 最佳实践
- 使用中文提问获得更好的回答
- 提供具体的上下文信息
- 对于代码问题，提供完整的代码片段
- 善用豆包的推理能力

## ✅ 部署成功标志

当你看到以下信息时，说明部署成功：

```bash
🎉 DeepCode CLI 启动成功！
🤖 当前使用模型: 豆包 (Doubao)
💬 输入你的问题开始对话...
>
```

## 🆘 需要帮助？

如果遇到问题，可以：
1. 查看上述故障排除部分
2. 运行 `node quick-test-doubao.js` 验证基础功能
3. 检查终端错误信息
4. 确保网络连接正常

---

**祝你使用愉快！豆包模型等你来体验！** 🚀
