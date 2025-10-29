#!/usr/bin/env node

/**
 * DeepCode CLI 豆包模型直接测试脚本
 * 用法: node test-cli-doubao.js
 */

import { DoubaoContentGenerator } from './packages/core/src/core/doubaoContentGenerator.js';

const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY || '7d06f6e9-3bdb-4fa3-91df-80ef487f7a61';

console.log('🚀 DeepCode CLI 豆包模型测试\n');

async function testDoubaoGenerator() {
  // 创建豆包生成器实例
  const doubaoGenerator = new DoubaoContentGenerator({
    apiKey: DOUBAO_API_KEY,
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3'
  });

  console.log('✅ 豆包生成器创建成功');

  // 测试请求
  const testRequest = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: '请用中文解释什么是人工智能，不超过100字。' }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 150
    }
  };

  try {
    console.log('📤 发送请求到豆包模型...');
    
    const response = await doubaoGenerator.generateContent(testRequest, 'test-prompt-id');
    
    console.log('✅ 豆包模型响应成功！');
    console.log('\n🤖 豆包回复:');
    console.log('"' + response.candidates[0].content.parts[0].text + '"');
    
    console.log('\n📊 使用统计:');
    console.log(`- 输入Token: ${response.usageMetadata?.promptTokenCount}`);
    console.log(`- 输出Token: ${response.usageMetadata?.candidatesTokenCount}`);
    console.log(`- 总计Token: ${response.usageMetadata?.totalTokenCount}`);
    
    console.log('\n🎉 豆包模型集成测试完全成功！');
    console.log('🚀 现在可以在DeepCode CLI中使用豆包模型了！');
    
  } catch (error) {
    console.log('❌ 测试失败:', error.message);
  }
}

testDoubaoGenerator();
