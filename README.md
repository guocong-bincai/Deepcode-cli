<div align="center">

# 🚀 DeepCode CLI

*一个强大的AI代码助手命令行工具 / A Powerful AI Code Assistant Command Line Tool*

[![CI](https://github.com/guocong-bincai/deepcode-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/guocong-bincai/deepcode-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/guocong-bincai/deepcode-cli)](https://github.com/guocong-bincai/deepcode-cli/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/deepcode-cli)](https://www.npmjs.com/package/deepcode-cli)

[English](#english) | [中文](#中文)

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

#### 安装

```bash
# 使用 npm
npm install -g deepcode-cli

# 使用 yarn
yarn global add deepcode-cli

# 或直接运行（无需安装）
npx deepcode-cli
```

#### 配置豆包模型

```bash
# 设置豆包API密钥
export DOUBAO_API_KEY="your-doubao-api-key"

# 启动DeepCode CLI
deepcode --model doubao

# 或在交互模式中切换
deepcode
> /model doubao
```

#### 基本使用

```bash
# 启动交互模式
deepcode

# 分析当前项目
deepcode --analyze

# 生成代码文档
deepcode --docs

# 调试模式
deepcode --debug
```

### 💡 使用示例

```bash
# 代码审查
deepcode review ./src

# 生成测试代码  
deepcode test --file ./app.js

# 重构建议
deepcode refactor --function calculateTotal

# 解释复杂代码
deepcode explain --code "complex_algorithm.py"
```

### 🌍 支持的AI模型

| 模型 | 语言支持 | 特色功能 | 状态 |
|------|----------|----------|------|
| 🇨🇳 字节豆包 | 中文优化 | 图文混合、推理增强 | ✅ 已支持 |
| 🧠 Google Gemini | 多语言 | 大上下文、多模态 | ✅ 已支持 |
| 🔧 DeepSeek | 代码专用 | 代码理解、生成 | 🚧 开发中 |
| ⚡ GPT-4 | 多语言 | 通用AI能力 | 📋 计划中 |

### 📖 文档

- [快速入门指南](./docs/quickstart-zh.md)
- [API文档](./docs/api-zh.md)
- [插件开发](./docs/plugins-zh.md)
- [豆包模型配置](./docs/doubao-setup-zh.md)

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

#### Installation

```bash
# Using npm
npm install -g deepcode-cli

# Using yarn
yarn global add deepcode-cli

# Or run directly (no installation needed)
npx deepcode-cli
```

#### Configure Doubao Model

```bash
# Set Doubao API key
export DOUBAO_API_KEY="your-doubao-api-key"

# Start DeepCode CLI
deepcode --model doubao

# Or switch in interactive mode
deepcode
> /model doubao
```

#### Basic Usage

```bash
# Start interactive mode
deepcode

# Analyze current project
deepcode --analyze

# Generate documentation
deepcode --docs

# Debug mode
deepcode --debug
```

### 💡 Usage Examples

```bash
# Code review
deepcode review ./src

# Generate test code
deepcode test --file ./app.js

# Refactoring suggestions
deepcode refactor --function calculateTotal

# Explain complex code
deepcode explain --code "complex_algorithm.py"
```

### 🌍 Supported AI Models

| Model | Language | Special Features | Status |
|-------|----------|------------------|--------|
| 🇨🇳 ByteDance Doubao | Chinese-optimized | Image-text, reasoning | ✅ Supported |
| 🧠 Google Gemini | Multi-language | Large context, multimodal | ✅ Supported |
| 🔧 DeepSeek | Code-focused | Code understanding | 🚧 In Development |
| ⚡ GPT-4 | Multi-language | General AI capabilities | 📋 Planned |

### 📖 Documentation

- [Quick Start Guide](./docs/quickstart-en.md)
- [API Documentation](./docs/api-en.md)
- [Plugin Development](./docs/plugins-en.md)
- [Doubao Model Setup](./docs/doubao-setup-en.md)

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

<div align="center">

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=guocong-bincai/deepcode-cli&type=Date)](https://star-history.com/#guocong-bincai/deepcode-cli&Date)

---

**Built with ❤️ by the open source community**

*让AI助力每一行代码 / Empowering every line of code with AI*

</div>