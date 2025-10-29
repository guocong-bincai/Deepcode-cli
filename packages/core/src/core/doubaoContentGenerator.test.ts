/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DoubaoContentGenerator } from './doubaoContentGenerator.js';
import type { GenerateContentParameters, CountTokensParameters } from '@google/genai';

describe('DoubaoContentGenerator', () => {
  let generator: DoubaoContentGenerator;
  const mockConfig = {
    apiKey: 'test-api-key',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
  };

  beforeEach(() => {
    generator = new DoubaoContentGenerator(mockConfig);
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateContent', () => {
    it('应该成功调用豆包API并返回格式化响应', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: '这是一个测试响应',
            },
          },
        ],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: '你好' }],
          },
        ],
      };

      const result = await generator.generateContent(request, 'test-prompt-id');

      expect(result.candidates).toHaveLength(1);
      expect(result.candidates[0].content.parts[0].text).toBe('这是一个测试响应');
      expect(result.usageMetadata?.promptTokenCount).toBe(10);
      expect(result.usageMetadata?.candidatesTokenCount).toBe(20);
      expect(result.usageMetadata?.totalTokenCount).toBe(30);
    });

    it('应该处理API错误', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error',
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: '你好' }],
          },
        ],
      };

      await expect(
        generator.generateContent(request, 'test-prompt-id')
      ).rejects.toThrow('豆包API调用失败');
    });

    it('应该处理空响应', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: '',
            },
          },
        ],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 0,
          total_tokens: 5,
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: 'test' }],
          },
        ],
      };

      const result = await generator.generateContent(request, 'test-prompt-id');
      expect(result.candidates[0].content.parts[0].text).toBe('豆包模型响应为空');
    });
  });

  describe('generateContentStream', () => {
    it('应该成功处理流式响应', async () => {
      // Mock SSE stream data
      const streamData = [
        'data: {"choices":[{"delta":{"content":"你"}}]}\n',
        'data: {"choices":[{"delta":{"content":"好"}}]}\n',
        'data: {"choices":[{"delta":{"content":"！"}}]}\n',
        'data: [DONE]\n',
      ].join('');

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode(streamData),
          })
          .mockResolvedValueOnce({
            done: true,
            value: undefined,
          }),
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => mockReader,
        },
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: '你好' }],
          },
        ],
      };

      const stream = await generator.generateContentStream(request, 'test-prompt-id');
      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(3);
      expect(chunks[0].candidates[0].content.parts[0].text).toBe('你');
      expect(chunks[1].candidates[0].content.parts[0].text).toBe('好');
      expect(chunks[2].candidates[0].content.parts[0].text).toBe('！');
    });

    it('应该正确处理流式响应中的token计数', async () => {
      const streamData = [
        'data: {"choices":[{"delta":{"content":"测试"},"finish_reason":null}],"usage":{"prompt_tokens":10,"completion_tokens":2,"total_tokens":12}}\n',
        'data: {"choices":[{"delta":{"content":"完成"},"finish_reason":"stop"}],"usage":{"prompt_tokens":10,"completion_tokens":4,"total_tokens":14}}\n',
        'data: [DONE]\n',
      ].join('');

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode(streamData),
          })
          .mockResolvedValueOnce({
            done: true,
            value: undefined,
          }),
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => mockReader,
        },
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: '测试' }],
          },
        ],
      };

      const stream = await generator.generateContentStream(request, 'test-prompt-id');
      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(2);
      expect(chunks[1].usageMetadata?.promptTokenCount).toBe(10);
      expect(chunks[1].usageMetadata?.candidatesTokenCount).toBe(4);
      expect(chunks[1].usageMetadata?.totalTokenCount).toBe(14);
      expect(chunks[1].candidates[0].finishReason).toBe('STOP');
    });

    it('应该处理流式API错误', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        text: async () => 'Rate limit exceeded',
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: '你好' }],
          },
        ],
      };

      const stream = await generator.generateContentStream(request, 'test-prompt-id');

      await expect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of stream) {
          // Should throw before yielding anything
        }
      }).rejects.toThrow('豆包流式API调用失败');
    });

    it('应该处理空流式响应', async () => {
      const streamData = 'data: [DONE]\n';

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode(streamData),
          })
          .mockResolvedValueOnce({
            done: true,
            value: undefined,
          }),
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: {
          getReader: () => mockReader,
        },
      });

      const request: GenerateContentParameters = {
        model: 'doubao-seed-1-6-251015',
        contents: [
          {
            role: 'user',
            parts: [{ text: 'test' }],
          },
        ],
      };

      const stream = await generator.generateContentStream(request, 'test-prompt-id');
      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(1);
      expect(chunks[0].candidates[0].content.parts[0].text).toBe('豆包模型响应为空');
    });
  });

  describe('countTokens', () => {
    it('应该准确估算纯英文文本的token数量', async () => {
      const request: CountTokensParameters = {
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Hello world this is a test' }],
          },
        ],
      };

      const result = await generator.countTokens(request);

      // "Hello world this is a test" = 26 characters / 4 ≈ 7 tokens
      expect(result.totalTokens).toBeGreaterThan(0);
      expect(result.totalTokens).toBeLessThan(15);
    });

    it('应该准确估算中文文本的token数量', async () => {
      const request: CountTokensParameters = {
        contents: [
          {
            role: 'user',
            parts: [{ text: '你好世界' }],
          },
        ],
      };

      const result = await generator.countTokens(request);

      // "你好世界 " = 4 Chinese chars * 1.5 = 6 tokens, + 1 space = 7 tokens
      expect(result.totalTokens).toBeGreaterThanOrEqual(6);
      expect(result.totalTokens).toBeLessThanOrEqual(7);
    });

    it('应该准确估算中英文混合文本的token数量', async () => {
      const request: CountTokensParameters = {
        contents: [
          {
            role: 'user',
            parts: [{ text: '你好 Hello 世界 World' }],
          },
        ],
      };

      const result = await generator.countTokens(request);

      // "你好世界" = 4 Chinese chars * 1.5 = 6 tokens
      // "Hello World" + spaces = ~15 chars / 4 ≈ 4 tokens
      // Total ≈ 10 tokens
      expect(result.totalTokens).toBeGreaterThan(8);
      expect(result.totalTokens).toBeLessThan(15);
    });

    it('应该为空文本返回至少1个token', async () => {
      const request: CountTokensParameters = {
        contents: [
          {
            role: 'user',
            parts: [{ text: '' }],
          },
        ],
      };

      const result = await generator.countTokens(request);
      expect(result.totalTokens).toBe(1);
    });

    it('应该处理多个content parts', async () => {
      const request: CountTokensParameters = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: '第一部分' },
              { text: '第二部分' },
            ],
          },
        ],
      };

      const result = await generator.countTokens(request);

      // "第一部分第二部分 " = 8 Chinese chars * 1.5 = 12 tokens
      expect(result.totalTokens).toBeGreaterThan(10);
    });
  });

  describe('embedContent', () => {
    it('应该抛出不支持的错误', async () => {
      await expect(
        generator.embedContent({
          content: { parts: [{ text: 'test' }] },
        })
      ).rejects.toThrow('豆包模型暂不支持嵌入功能');
    });
  });
});
