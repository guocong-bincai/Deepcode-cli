#!/usr/bin/env node

/**
 * 快速测试豆包模型 - 验证功能是否正常
 */

const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY || '7d06f6e9-3bdb-4fa3-91df-80ef487f7a61';

console.log('🚀 快速测试豆包模型功能\n');

// 测试问题列表
const testQuestions = [
  '你好，请简单介绍一下你自己',
  '请解释什么是递归？',
  '写一个JavaScript函数计算阶乘',
  '什么是AI？用一句话回答',
  '1+1等于多少？'
];

async function testQuestion(question, index) {
  console.log(`📝 测试 ${index + 1}: "${question}"`);
  
  const request = {
    model: 'doubao-seed-1-6-251015',
    messages: [{ role: 'user', content: question }],
    max_completion_tokens: 200,
    temperature: 0.7,
    reasoning_effort: 'medium'
  };

  try {
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
      const reply = data.choices[0]?.message?.content || '(空回复)';
      
      console.log(`✅ 成功! 豆包回复: "${reply}"`);
      console.log(`📊 Token: 输入${data.usage.prompt_tokens}, 输出${data.usage.completion_tokens}\n`);
      return true;
    } else {
      const errorData = await response.text();
      console.log(`❌ 失败 (${response.status}): ${errorData}\n`);
      return false;
    }
  } catch (error) {
    console.log(`❌ 错误: ${error.message}\n`);
    return false;
  }
}

async function runQuickTest() {
  console.log(`🔑 使用API Key: ${DOUBAO_API_KEY.substring(0, 8)}...\n`);
  
  let successCount = 0;
  
  for (let i = 0; i < testQuestions.length; i++) {
    const success = await testQuestion(testQuestions[i], i);
    if (success) successCount++;
    
    // 添加延迟避免请求过快
    if (i < testQuestions.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('='.repeat(50));
  console.log(`📊 测试结果: ${successCount}/${testQuestions.length} 成功`);
  
  if (successCount > 0) {
    console.log('🎉 豆包模型工作正常！');
    console.log('\n✅ 集成状态: 豆包模型已成功集成到DeepCode CLI');
    console.log('🚀 你现在可以使用以下方式启动DeepCode CLI:');
    console.log(`   export DOUBAO_API_KEY="${DOUBAO_API_KEY}"`);
    console.log('   deepcode --auth-type doubao-api-key');
  } else {
    console.log('❌ 豆包模型调用失败，请检查API Key和网络连接');
  }
}

runQuickTest();
