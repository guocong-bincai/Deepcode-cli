#!/bin/bash

echo "🚀 DeepCode CLI 快速开始脚本"
echo "=============================="

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ 未安装Node.js，请先安装Node.js 20+版本"
    echo "🔗 下载地址: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js版本过低，需要v20+，当前版本: $(node --version)"
    exit 1
fi

echo "✅ Node.js版本检查通过: $(node --version)"

# 设置豆包API密钥
echo "🔧 设置豆包API密钥..."
export DOUBAO_API_KEY="7d06f6e9-3bdb-4fa3-91df-80ef487f7a61"
echo "✅ 豆包API密钥已设置（测试用）"

# 创建测试项目目录
TEST_DIR="$HOME/deepcode-test-$(date +%s)"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

echo "📁 创建测试项目目录: $TEST_DIR"

# 创建示例代码文件
cat > example.js << 'EOF'
// 示例JavaScript代码 - 需要优化
function calculateTotal(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    return total;
}

function processOrder(order) {
    if (order.items && order.items.length > 0) {
        var total = calculateTotal(order.items);
        order.total = total;
        order.status = "processed";
        return order;
    }
    return null;
}

module.exports = { calculateTotal, processOrder };
EOF

echo "📝 创建示例代码文件: example.js"

# 创建package.json
cat > package.json << 'EOF'
{
  "name": "deepcode-test-project",
  "version": "1.0.0",
  "description": "DeepCode CLI 测试项目",
  "main": "example.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["test", "deepcode"],
  "author": "DeepCode CLI User",
  "license": "MIT"
}
EOF

echo "📦 创建package.json文件"

echo ""
echo "🎯 准备工作完成！现在有三种使用方式："
echo ""

echo "方式1️⃣  使用npx（推荐，无需安装）:"
echo "npx deepcode-cli@latest"
echo ""

echo "方式2️⃣  全局安装后使用:"
echo "npm install -g deepcode-cli@latest"
echo "deepcode"
echo ""

echo "方式3️⃣  直接下载运行:"
echo "npm pack deepcode-cli@latest"
echo "tar -xf deepcode-cli-*.tgz"
echo "cd package && node deepcode"
echo ""

echo "💡 使用建议："
echo "1. 启动后输入: /init           # 分析项目"
echo "2. 然后尝试: 审查example.js的代码质量"
echo "3. 或者问: 为calculateTotal函数生成测试用例"
echo "4. 退出请输入: /quit"
echo ""

echo "🎉 开始你的AI编程之旅吧！"

# 询问是否立即启动
read -p "是否立即启动DeepCode CLI? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 正在启动DeepCode CLI..."
    npx deepcode-cli@latest
fi
