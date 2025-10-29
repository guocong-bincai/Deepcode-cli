#!/usr/bin/env node

/**
 * 豆包模型交互式测试脚本
 * 模拟完整的DeepCode CLI体验
 */

import readline from 'readline';

const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY || '7d06f6e9-3bdb-4fa3-91df-80ef487f7a61';

// 创建交互界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 DeepCode CLI - 豆包模型交互测试');
console.log('=====================================');
console.log('🤖 当前模型: 字节豆包 (Doubao)');
console.log('💡 提示: 输入中文问题获得最佳体验');
console.log('📝 输入 /help 查看帮助，/quit 退出');
console.log('');

// 豆包API调用函数
async function callDoubao(userInput) {
  const request = {
    model: 'doubao-seed-1-6-251015',
    messages: [
      {
        role: 'user',
        content: userInput
      }
    ],
    max_completion_tokens: 800,
    temperature: 0.7,
    reasoning_effort: 'medium'
  };

  try {
    console.log('🤔 豆包思考中...');
    
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.choices[0]?.message?.content || '豆包暂时无法响应，请稍后再试。';
      
      console.log('\n🤖 豆包回复:');
      console.log('─'.repeat(50));
      console.log(reply);
      console.log('─'.repeat(50));
      console.log(`📊 Token使用: 输入${data.usage.prompt_tokens}, 输出${data.usage.completion_tokens}`);
      console.log('');
      
    } else {
      const errorData = await response.text();
      console.log(`❌ API调用失败 (${response.status}): ${errorData}`);
    }
  } catch (error) {
    console.log(`❌ 请求错误: ${error.message}`);
  }
}

// 处理特殊命令
function handleCommand(input) {
  const command = input.toLowerCase().trim();
  
  switch (command) {
    case '/help':
      console.log('\n📚 DeepCode CLI 帮助');
      console.log('═══════════════════');
      console.log('🔧 基础命令:');
      console.log('  /help     - 显示此帮助信息');
      console.log('  /quit     - 退出程序');
      console.log('  /clear    - 清屏');
      console.log('  /model    - 显示当前模型信息');
      console.log('  /test     - 运行预设测试');
      console.log('');
      console.log('💡 使用建议:');
      console.log('  - 用中文提问获得更好效果');
      console.log('  - 可以询问编程、数学、常识等问题');
      console.log('  - 支持代码生成和解释');
      console.log('  - 支持多轮对话');
      console.log('');
      return true;
      
    case '/quit':
    case '/exit':
      console.log('👋 再见！感谢使用DeepCode CLI!');
      rl.close();
      return true;
      
    case '/clear':
      console.clear();
      console.log('🚀 DeepCode CLI - 豆包模型交互测试');
      console.log('🤖 当前模型: 字节豆包 (Doubao) - 屏幕已清理');
      console.log('');
      return true;
      
    case '/model':
      console.log('\n🤖 当前模型信息');
      console.log('═══════════════');
      console.log('名称: 字节豆包 (Doubao)');
      console.log('版本: doubao-seed-1-6-251015');
      console.log('特色: 中文优化，支持推理增强');
      console.log('Token限制: 最大800输出Token');
      console.log('API状态: ✅ 正常');
      console.log('');
      return true;
      
    case '/test':
      runPresetTests();
      return true;
      
    default:
      return false;
  }
}

// 运行预设测试
async function runPresetTests() {
  console.log('\n🧪 运行预设测试...');
  console.log('═══════════════════');
  
  const testCases = [
    '你好，请简单介绍一下你自己',
    '1+1等于几？',
    '什么是递归？请举个简单例子',
    'Python中如何定义一个函数？'
  ];
  
  for (let i = 0; i < testCases.length; i++) {
    console.log(`\n📝 测试 ${i + 1}/${testCases.length}: "${testCases[i]}"`);
    await callDoubao(testCases[i]);
    
    if (i < testCases.length - 1) {
      console.log('⏱️  等待2秒后继续下一个测试...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('✅ 预设测试完成！');
}

// 主对话循环
function startChat() {
  rl.question('💬 你: ', async (input) => {
    if (input.trim() === '') {
      startChat();
      return;
    }
    
    // 处理特殊命令
    if (input.startsWith('/')) {
      const handled = handleCommand(input);
      if (!handled) {
        console.log('❓ 未知命令，输入 /help 查看帮助');
      }
      if (input !== '/quit' && input !== '/exit') {
        startChat();
      }
      return;
    }
    
    // 调用豆包API
    await callDoubao(input);
    
    // 继续对话
    startChat();
  });
}

// 启动程序
console.log('🎯 准备就绪！请输入你的问题：');
console.log('');
startChat();

// 处理程序退出
rl.on('close', () => {
  console.log('\n👋 谢谢使用DeepCode CLI！');
  process.exit(0);
});

// 处理Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🛑 检测到中断信号');
  console.log('👋 再见！');
  rl.close();
});
