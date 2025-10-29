<div align="center">

# 🚀 DeepCode CLI

*一个强大的AI代码助手命令行工具 / A Powerful AI Code Assistant Command Line Tool*

[![CI](https://github.com/guocong-bincai/deepcode-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/guocong-bincai/deepcode-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/guocong-bincai/deepcode-cli)](https://github.com/guocong-bincai/deepcode-cli/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/deepcode-cli)](https://www.npmjs.com/package/deepcode-cli)
[![Downloads](https://img.shields.io/npm/dm/deepcode-cli)](https://www.npmjs.com/package/deepcode-cli)

[English](#english) | [中文](#中文)

**最新版本: v1.3.0 - 🚀 真正的流式输出！**

---

</div>

## 🌟 中文

### 项目简介

DeepCode CLI 是一个开源的AI代码助手命令行工具，专为开发者设计。它将强大的AI能力直接带到你的终端中，支持多种AI模型，让编程变得更加高效和智能。

### ✨ 核心特性

#### 🤖 多AI模型支持
- **🇨🇳 字节豆包 (Doubao)** - 中文优化的AI模型，支持图文混合输入
- **🧠 Google Gemini** - 强大的多模态AI模型，支持100万Token上下文
- **🔧 DeepSeek** - 专注代码理解的AI模型
- **⚡ 更多模型** - 持续集成更多AI模型

#### 🛠️ 强大功能
- **📁 代码理解** - 深度分析大型代码库
- **✍️ 代码生成** - 从自然语言生成高质量代码
- **🐛 智能调试** - 自动发现和修复代码问题
- **📚 文档生成** - 自动生成代码文档和注释
- **🔍 代码搜索** - 语义化代码搜索和分析

#### 🔌 扩展能力
- **MCP协议支持** - 模型上下文协议，轻松集成第三方工具
- **自定义命令** - 创建专属的AI工作流
- **插件系统** - 丰富的插件生态
- **API集成** - 支持各种第三方API服务

### 🚀 快速开始

#### ⚡ 开始使用

```bash
# 1. 获取你的豆包API密钥
# 访问: https://console.volcengine.com/ark
# 创建应用获取API Key

# 2. 设置密钥并启动
export DOUBAO_API_KEY="your-actual-api-key"
npx deepcode-cli@latest
```

#### 📦 安装方式

```bash
# 方式1: 全局安装
npm install -g deepcode-cli@latest

# 方式2: 直接使用（无需安装）
npx deepcode-cli@latest

# 方式3: 下载运行
npm pack deepcode-cli@latest
tar -xf deepcode-cli-*.tgz && cd package && node deepcode
```

#### 🔧 配置豆包模型

```bash
# 设置豆包API密钥（测试用）
export DOUBAO_API_KEY="your-doubao-api-key"

# 启动DeepCode CLI
deepcode

# 在交互模式中使用
💬 你: 你好，分析一下这个项目
🤖 豆包: [开始分析...]
```

#### 🎯 基本使用

```bash
# 启动交互模式
deepcode

# 项目分析（推荐第一步）
> /init

# 代码审查
> 请审查src/main.js的代码质量

# 生成测试
> 为calculateTotal函数生成单元测试

# 解释代码  
> 解释这段算法的工作原理：[粘贴代码]
```

### 💡 实际使用示例

#### 🔍 项目分析与代码审查
```bash
# 启动DeepCode CLI
export DOUBAO_API_KEY="your-doubao-api-key"
deepcode

# 在交互界面中：
💬 你: /init
🤖 豆包: 正在分析项目结构...

💬 你: 请全面审查这个项目的代码质量，重点关注性能和安全性
🤖 豆包: [详细的代码审查报告]
```

#### 🧪 测试生成
```bash
💬 你: 为这个函数生成完整的单元测试：
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

🤖 豆包: [生成Jest/Mocha测试代码]
```

#### 🔧 代码重构与优化
```bash
💬 你: 这个函数性能不好，帮我优化：
[粘贴你的代码]

🤖 豆包: [提供重构建议和优化后的代码]
```

#### 📚 代码解释与学习
```bash
💬 你: 解释这个递归算法的工作原理
💬 你: 什么是闭包？给我一个实际例子
💬 你: 这段SQL查询是怎么工作的？
```

### 🌍 支持的AI模型

| 模型 | 语言支持 | 特色功能 | 状态 |
|------|----------|----------|------|
| 🇨🇳 字节豆包 | 中文优化 | 图文混合、推理增强 | ✅ 已支持 |
| 🧠 Google Gemini | 多语言 | 大上下文、多模态 | ✅ 已支持 |
| 🔧 DeepSeek | 代码专用 | 代码理解、生成 | 🚧 开发中 |
| ⚡ GPT-4 | 多语言 | 通用AI能力 | 📋 计划中 |

### 🎉 最新更新 (v1.3.0)

- 🚀 **真正的流式输出** - SSE逐字实时显示，类似ChatGPT体验
- 🧮 **智能Token计算** - 中英文混合优化算法，准确率95%+
- 🧪 **完整单元测试** - 13个测试覆盖所有功能
- ⚡ **性能大幅提升** - 首字响应~500ms，流畅交互体验

### 📖 文档

- [豆包模型使用指南](./DOUBAO_USAGE.md)
- [完整使用指南](./使用指南.md)
- [快速开始脚本](./快速开始.sh)
- [GitHub Issues](https://github.com/guocong-bincai/deepcode-cli/issues)

### 🤝 参与贡献

我们欢迎所有形式的贡献！

```bash
# 克隆项目
git clone https://github.com/guocong-bincai/deepcode-cli.git

# 安装依赖
cd deepcode-cli
npm install

# 开始开发
npm run dev
```

### 📄 许可证

本项目基于 [Apache 2.0](LICENSE) 许可证开源。

---

## 🌟 English

### Introduction

DeepCode CLI is an open-source AI code assistant command-line tool designed for developers. It brings powerful AI capabilities directly to your terminal, supporting multiple AI models to make programming more efficient and intelligent.

### ✨ Key Features

#### 🤖 Multi-AI Model Support
- **🇨🇳 ByteDance Doubao** - Chinese-optimized AI model with image-text input support
- **🧠 Google Gemini** - Powerful multimodal AI with 1M token context window  
- **🔧 DeepSeek** - Code-focused AI model for better code understanding
- **⚡ More Models** - Continuously integrating more AI models

#### 🛠️ Powerful Capabilities
- **📁 Code Understanding** - Deep analysis of large codebases
- **✍️ Code Generation** - Generate high-quality code from natural language
- **🐛 Smart Debugging** - Automatically find and fix code issues
- **📚 Documentation Generation** - Auto-generate code docs and comments
- **🔍 Code Search** - Semantic code search and analysis

#### 🔌 Extensibility
- **MCP Protocol Support** - Model Context Protocol for easy third-party tool integration
- **Custom Commands** - Create your own AI workflows
- **Plugin System** - Rich plugin ecosystem
- **API Integration** - Support for various third-party API services

### 🚀 Quick Start

#### ⚡ Getting Started

```bash
# 1. Get your Doubao API key
# Visit: https://console.volcengine.com/ark
# Create application and get API Key

# 2. Set key and start
export DOUBAO_API_KEY="your-actual-api-key"
npx deepcode-cli@latest
```

#### 📦 Installation Methods

```bash
# Method 1: Global installation
npm install -g deepcode-cli@latest

# Method 2: Direct use (no installation needed)
npx deepcode-cli@latest

# Method 3: Download and run
npm pack deepcode-cli@latest
tar -xf deepcode-cli-*.tgz && cd package && node deepcode
```

#### 🔧 Configure Doubao Model

```bash
# Set Doubao API key (test key)
export DOUBAO_API_KEY="your-doubao-api-key"

# Start DeepCode CLI
deepcode

# Use in interactive mode
💬 You: Hello, analyze this project
🤖 Doubao: [Starting analysis...]
```

#### 🎯 Basic Usage

```bash
# Start interactive mode
deepcode

# Project analysis (recommended first step)
> /init

# Code review
> Please review the code quality of src/main.js

# Generate tests
> Generate unit tests for the calculateTotal function

# Explain code
> Explain how this algorithm works: [paste code]
```

### 💡 Real Usage Examples

#### 🔍 Project Analysis & Code Review
```bash
# Start DeepCode CLI
export DOUBAO_API_KEY="your-doubao-api-key"
deepcode

# In interactive interface:
💬 You: /init
🤖 Doubao: Analyzing project structure...

💬 You: Please comprehensively review this project's code quality, focusing on performance and security
🤖 Doubao: [Detailed code review report]
```

#### 🧪 Test Generation
```bash
💬 You: Generate complete unit tests for this function:
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

🤖 Doubao: [Generates Jest/Mocha test code]
```

#### 🔧 Code Refactoring & Optimization
```bash
💬 You: This function has poor performance, please help me optimize it:
[paste your code]

🤖 Doubao: [Provides refactoring suggestions and optimized code]
```

#### 📚 Code Explanation & Learning
```bash
💬 You: Explain how this recursive algorithm works
💬 You: What is a closure? Give me a practical example
💬 You: How does this SQL query work?
```

### 🌍 Supported AI Models

| Model | Language | Special Features | Status |
|-------|----------|------------------|--------|
| 🇨🇳 ByteDance Doubao | Chinese-optimized | Image-text, reasoning | ✅ Supported |
| 🧠 Google Gemini | Multi-language | Large context, multimodal | ✅ Supported |
| 🔧 DeepSeek | Code-focused | Code understanding | 🚧 In Development |
| ⚡ GPT-4 | Multi-language | General AI capabilities | 📋 Planned |

### 🎉 Latest Update (v1.3.0)

- 🚀 **Real Streaming Output** - SSE real-time word-by-word display, ChatGPT-like experience
- 🧮 **Smart Token Calculation** - Chinese-English mixed optimization algorithm, 95%+ accuracy
- 🧪 **Complete Unit Tests** - 13 tests covering all functionality
- ⚡ **Major Performance Boost** - ~500ms first-word response, smooth interaction

### 📖 Documentation

- [Doubao Model Usage Guide](./DOUBAO_USAGE.md)
- [Complete Usage Guide](./使用指南.md)
- [Quick Start Script](./快速开始.sh)
- [GitHub Issues](https://github.com/guocong-bincai/deepcode-cli/issues)

### 🤝 Contributing

We welcome all forms of contributions!

```bash
# Clone the project
git clone https://github.com/guocong-bincai/deepcode-cli.git

# Install dependencies  
cd deepcode-cli
npm install

# Start development
npm run dev
```

### 📄 License

This project is open source under the [Apache 2.0](LICENSE) license.

---

---

## 🚀 立即开始 / Get Started Now

### 中文用户
```bash
# 1. 获取API密钥: https://console.volcengine.com/ark  
# 2. 设置并启动
export DOUBAO_API_KEY="your-actual-api-key"
npx deepcode-cli@latest
```

### English Users  
```bash
# 1. Get API key: https://console.volcengine.com/ark
# 2. Set and start
export DOUBAO_API_KEY="your-actual-api-key"
npx deepcode-cli@latest
```

### 获得帮助 / Get Help

- 📋 [报告问题 / Report Issues](https://github.com/guocong-bincai/deepcode-cli/issues)
- 💬 [功能建议 / Feature Request](https://github.com/guocong-bincai/deepcode-cli/discussions)
- 📖 [完整文档 / Full Documentation](./使用指南.md)
- ⚡ [快速开始 / Quick Start](./快速开始.sh)

---

<div align="center">

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=guocong-bincai/deepcode-cli&type=Date)](https://star-history.com/#guocong-bincai/deepcode-cli&Date)

---

**Built with ❤️ by the open source community**

*让AI助力每一行代码 / Empowering every line of code with AI*

**🚀 v1.3.0 现已支持真正的流式输出！/ v1.3.0 Now with real streaming output!**

</div>