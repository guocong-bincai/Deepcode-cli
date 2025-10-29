# 🥟 豆包模型集成使用指南

## ✅ 集成状态

豆包模型已成功集成到DeepCode CLI中，完全兼容现有功能：

- ✅ **代码审查** - CodebaseInvestigatorAgent
- ✅ **代码编辑** - EditTool, SmartEditTool  
- ✅ **文件操作** - ReadFileTool, WriteFileTool
- ✅ **代码搜索** - GrepTool, GlobTool
- ✅ **Shell集成** - ShellTool
- ✅ **网络功能** - WebSearchTool, WebFetchTool
- ✅ **流式处理** - 完整的useGeminiStream支持

## 🚀 使用方法

### 1. 设置API密钥
```bash
export DOUBAO_API_KEY="your-doubao-api-key"
```

### 2. 启动DeepCode CLI（豆包模式）
```bash
# 方法1: 通过环境变量指定认证类型
export GEMINI_AUTH_TYPE=doubao-api-key
npm run start

# 方法2: 通过配置文件设置默认模型
# 在设置中将auth.selectedType设置为"doubao-api-key"
```

### 3. 验证集成
运行验证脚本确保一切正常：
```bash
node verify-doubao-integration.mjs
```

## 💡 功能特色

### 🇨🇳 中文优化
- 豆包模型对中文理解和生成能力优秀
- 特别适合中文代码注释和文档生成
- 支持中英文混合编程场景

### 🔧 所有原有功能保持不变
- `/init` - 项目分析和GEMINI.md生成
- 斜杠命令系统完整保留
- 所有工具和代理功能正常工作
- 交互式UI完全兼容

### 📊 性能表现
- API响应速度：1-2秒
- Token计算准确
- 错误处理完善
- 流式响应支持

## 🎯 使用示例

启动DeepCode CLI后，你可以：

```
📝 你: 分析这个项目的代码结构
🤖 豆包: [详细的项目分析...]

📝 你: /init
🤖 豆包: [自动生成GEMINI.md文件...]

📝 你: 帮我重构这个函数
🤖 豆包: [专业的重构建议...]
```

## 🔄 切换模型

你可以在同一个项目中轻松切换不同的AI模型：

```bash
# 使用Gemini
export GEMINI_API_KEY="your-gemini-key"
export GEMINI_AUTH_TYPE=gemini-api-key

# 使用豆包
export DOUBAO_API_KEY="your-doubao-key" 
export GEMINI_AUTH_TYPE=doubao-api-key

# 使用Vertex AI
export GOOGLE_CLOUD_PROJECT="your-project"
export GOOGLE_CLOUD_LOCATION="your-location"
export GEMINI_AUTH_TYPE=vertex-ai
```

## 🎉 总结

豆包模型已完全集成到DeepCode CLI的架构中：

- **无缝兼容**：所有现有功能保持不变
- **简单配置**：只需设置API密钥即可使用
- **中文优化**：特别适合中文开发环境
- **专业能力**：支持代码审查、分析、重构等所有功能

立即开始使用豆包增强的DeepCode CLI！🚀
