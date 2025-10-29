#!/usr/bin/env node

/**
 * 豆包流式输出快速测试脚本
 *
 * 使用方法：
 * export DOUBAO_API_KEY="your-api-key"
 * node test-doubao-stream.mjs
 */

import { DoubaoContentGenerator } from './packages/core/src/core/doubaoContentGenerator.js';

const apiKey = process.env.DOUBAO_API_KEY;
if (!apiKey) {
  console.error('❌ 错误：未设置 DOUBAO_API_KEY 环境变量');
  console.error('');
  console.error('请运行：');
  console.error('  export DOUBAO_API_KEY="your-api-key"');
  console.error('  node test-doubao-stream.mjs');
  process.exit(1);
}

const config = {
  apiKey,
  baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
};

const generator = new DoubaoContentGenerator(config);

console.log('🥟 豆包流式输出测试');
console.log('='.repeat(60));
console.log('');

async function testStream() {
  const request = {
    model: 'doubao-seed-1-6-251015',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: '用一句话解释什么是递归算法',
          },
        ],
      },
    ],
  };

  console.log('📝 问题：用一句话解释什么是递归算法');
  console.log('');
  console.log('🤖 豆包回答：');
  console.log('-'.repeat(60));

  try {
    const startTime = Date.now();
    let firstChunkTime = null;
    let totalText = '';
    let chunkCount = 0;

    const stream = await generator.generateContentStream(request, 'test-prompt-id');

    for await (const chunk of stream) {
      if (!firstChunkTime) {
        firstChunkTime = Date.now();
        console.log(`⚡ 首字响应时间: ${firstChunkTime - startTime}ms`);
        console.log('-'.repeat(60));
      }

      const text = chunk.candidates[0]?.content.parts[0]?.text || '';
      totalText += text;
      chunkCount++;

      // 实时输出（不换行）
      process.stdout.write(text);

      // 显示token统计（如果有）
      if (chunk.usageMetadata) {
        const usage = chunk.usageMetadata;
        if (usage.totalTokenCount > 0) {
          console.log('');
          console.log('');
          console.log('-'.repeat(60));
          console.log(`📊 Token统计:`);
          console.log(`   输入: ${usage.promptTokenCount} tokens`);
          console.log(`   输出: ${usage.candidatesTokenCount} tokens`);
          console.log(`   总计: ${usage.totalTokenCount} tokens`);
        }
      }
    }

    const endTime = Date.now();
    console.log('');
    console.log('='.repeat(60));
    console.log('');
    console.log('✅ 流式输出完成');
    console.log('');
    console.log('📈 性能统计：');
    console.log(`   总耗时: ${endTime - startTime}ms`);
    console.log(`   首字响应: ${firstChunkTime ? firstChunkTime - startTime : 'N/A'}ms`);
    console.log(`   流式块数: ${chunkCount}`);
    console.log(`   总字符数: ${totalText.length}`);
    console.log(`   平均速度: ${Math.round(totalText.length / ((endTime - startTime) / 1000))} 字符/秒`);

  } catch (error) {
    console.error('');
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

async function testTokenCount() {
  console.log('');
  console.log('');
  console.log('🧮 Token计数测试');
  console.log('='.repeat(60));

  const testCases = [
    { text: 'Hello World', expected: '~3 tokens' },
    { text: '你好世界', expected: '~6-7 tokens' },
    { text: '你好 Hello 世界 World', expected: '~10-12 tokens' },
    { text: '写一个递归算法来计算斐波那契数列', expected: '~20-25 tokens' },
  ];

  for (const testCase of testCases) {
    const request = {
      contents: [
        {
          role: 'user',
          parts: [{ text: testCase.text }],
        },
      ],
    };

    const result = await generator.countTokens(request);
    console.log('');
    console.log(`文本: "${testCase.text}"`);
    console.log(`预估: ${testCase.expected}`);
    console.log(`实际: ${result.totalTokens} tokens`);
    console.log(`✓`);
  }

  console.log('');
  console.log('='.repeat(60));
}

// 运行测试
(async () => {
  try {
    await testStream();
    await testTokenCount();
    console.log('');
    console.log('🎉 所有测试完成！');
  } catch (error) {
    console.error('');
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
})();
