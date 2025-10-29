#!/bin/bash

# 测试交互模式的自动化脚本

echo "🧪 测试DeepCode CLI交互模式"
echo "=============================="

# 创建测试输入
cat << 'EOF' > test_input.txt
你好
/model
1+1等于多少？
/help
/quit
EOF

echo "📝 将执行以下测试序列:"
echo "1. 你好 (问候测试)"
echo "2. /model (查看模型信息)"
echo "3. 1+1等于多少？ (数学计算测试)" 
echo "4. /help (帮助信息)"
echo "5. /quit (退出)"
echo ""

echo "🚀 开始测试..."
echo ""

# 使用输入文件测试交互模式
timeout 30 ./deepcode < test_input.txt

# 清理临时文件
rm -f test_input.txt

echo ""
echo "✅ 交互模式测试完成"
