#!/bin/bash

# DeepCode CLI 快速启动脚本
# 自动设置环境并启动AI助手

echo "🚀 DeepCode CLI 快速启动"
echo "========================"

# 设置豆包API密钥
export DOUBAO_API_KEY="7d06f6e9-3bdb-4fa3-91df-80ef487f7a61"

# 显示启动信息
echo "✅ 豆包API密钥已设置"
echo "🤖 准备启动AI代码助手..."
echo ""

# 检查是否提供了参数
if [ $# -eq 0 ]; then
    # 无参数，启动交互模式
    echo "🎯 启动交互模式（输入 /quit 退出）"
    echo ""
    ./deepcode
else
    # 有参数，传递给deepcode
    echo "🎯 执行命令: deepcode $@"
    echo ""
    ./deepcode "$@"
fi
