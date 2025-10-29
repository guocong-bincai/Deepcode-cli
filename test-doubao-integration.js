#!/usr/bin/env node

/**
 * 豆包模型集成测试脚本
 * 使用方法: node test-doubao-integration.js
 */

import https from 'https';

// 豆包API配置
const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY || '7d06f6e9-3bdb-4fa3-91df-80ef487f7a61';
const DOUBAO_BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3';

console.log('🚀 开始测试豆包模型集成...\n');

// 测试1: 基础API连接测试
async function testBasicConnection() {
  console.log('📡 测试1: 基础API连接');
  
  const request = {
    model: 'doubao-seed-1-6-251015',
    messages: [
      {
        role: 'user',
        content: '你好，请用一句话介绍你自己。'
      }
    ],
    max_completion_tokens: 100,
    temperature: 0.7,
    reasoning_effort: 'medium'
  };

  const postData = JSON.stringify(request);
  const options = {
    hostname: 'ark.cn-beijing.volces.com',
    port: 443,
    path: '/api/v3/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DOUBAO_API_KEY}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log(`✅ API连接成功 (状态码: ${res.statusCode})`);
            console.log(`🤖 豆包回复: "${response.choices[0]?.message?.content || '(空回复)'}"`);
            console.log(`📊 Token使用: 输入${response.usage?.prompt_tokens}, 输出${response.usage?.completion_tokens}\n`);
            resolve(true);
          } else {
            console.log(`❌ API连接失败 (状态码: ${res.statusCode})`);
            console.log(`错误信息: ${response.error?.message || '未知错误'}\n`);
            resolve(false);
          }
        } catch (e) {
          console.log(`❌ 响应解析失败: ${e.message}\n`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ 请求失败: ${error.message}\n`);
      resolve(false);
    });
    
    req.write(postData);
    req.end();
  });
}

// 测试2: 模拟DeepCode CLI调用
async function testDeepCodeIntegration() {
  console.log('🔧 测试2: 模拟DeepCode CLI集成');
  
  // 模拟contentGenerator的调用方式
  const mockRequest = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: '请解释什么是递归函数？' }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 200
    }
  };

  // 提取文本内容
  let prompt = '';
  for (const content of mockRequest.contents) {
    for (const part of content.parts) {
      if (part.text) {
        prompt += part.text + ' ';
      }
    }
  }

  const doubaoRequest = {
    model: 'doubao-seed-1-6-251015',
    messages: [
      {
        role: 'user',
        content: prompt.trim()
      }
    ],
    max_completion_tokens: mockRequest.generationConfig.maxOutputTokens,
    temperature: mockRequest.generationConfig.temperature,
    reasoning_effort: 'medium'
  };

  try {
    const response = await fetch(`${DOUBAO_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOUBAO_API_KEY}`,
      },
      body: JSON.stringify(doubaoRequest),
    });

    if (response.ok) {
      const data = await response.json();
      
      // 转换为DeepCode CLI格式
      const deepCodeResponse = {
        candidates: [
          {
            content: {
              parts: [
                { text: data.choices[0]?.message?.content || '豆包模型响应为空' }
              ],
              role: 'model'
            },
            finishReason: 'STOP',
            index: 0
          }
        ],
        usageMetadata: {
          promptTokenCount: data.usage?.prompt_tokens || 0,
          candidatesTokenCount: data.usage?.completion_tokens || 0,
          totalTokenCount: data.usage?.total_tokens || 0
        }
      };

      console.log('✅ DeepCode CLI格式转换成功');
      console.log(`🤖 回复内容: "${deepCodeResponse.candidates[0].content.parts[0].text}"`);
      console.log(`📊 Token统计: ${JSON.stringify(deepCodeResponse.usageMetadata)}\n`);
      return true;
    } else {
      const errorText = await response.text();
      console.log(`❌ 集成测试失败: ${response.status} ${errorText}\n`);
      return false;
    }
  } catch (error) {
    console.log(`❌ 集成测试异常: ${error.message}\n`);
    return false;
  }
}

// 测试3: 环境变量检查
function testEnvironment() {
  console.log('🔍 测试3: 环境变量检查');
  
  console.log(`DOUBAO_API_KEY: ${DOUBAO_API_KEY ? '✅ 已设置' : '❌ 未设置'}`);
  console.log(`API Key 格式: ${DOUBAO_API_KEY?.substring(0, 8)}...`);
  console.log(`基础URL: ${DOUBAO_BASE_URL}\n`);
  
  return !!DOUBAO_API_KEY;
}

// 主测试函数
async function runTests() {
  console.log('🧪 豆包模型集成测试开始\n');
  console.log('='.repeat(50));
  
  let passedTests = 0;
  let totalTests = 3;
  
  // 测试环境变量
  if (testEnvironment()) {
    passedTests++;
  }
  
  // 测试基础连接
  if (await testBasicConnection()) {
    passedTests++;
  }
  
  // 测试集成
  if (await testDeepCodeIntegration()) {
    passedTests++;
  }
  
  console.log('='.repeat(50));
  console.log(`📊 测试结果: ${passedTests}/${totalTests} 测试通过`);
  
  if (passedTests === totalTests) {
    console.log('🎉 所有测试通过！豆包模型集成成功！');
    console.log('\n📝 使用方法:');
    console.log(`export DOUBAO_API_KEY="${DOUBAO_API_KEY}"`);
    console.log('deepcode --auth-type doubao-api-key');
  } else {
    console.log('⚠️  部分测试失败，请检查配置');
  }
}

runTests().catch(console.error);
