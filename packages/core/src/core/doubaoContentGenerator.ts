/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple Doubao Content Generator for testing
import type {
  CountTokensResponse,
  GenerateContentResponse,
  GenerateContentParameters,
  CountTokensParameters,
  EmbedContentResponse,
  EmbedContentParameters,
} from '@google/genai';
import type { ContentGenerator } from './contentGenerator.js';
import type { UserTierId } from '../code_assist/types.js';

export interface DoubaoConfig {
  apiKey: string;
  baseUrl: string;
}

export class DoubaoContentGenerator implements ContentGenerator {
  userTier?: UserTierId;

  constructor(private readonly config: DoubaoConfig) {}

  async generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    // Extract text from request
    let prompt = '';
    if (request.contents) {
      for (const content of request.contents) {
        for (const part of content.parts) {
          if (part.text) {
            prompt += part.text + ' ';
          }
        }
      }
    }

    // Call Doubao API
    const doubaoRequest = {
      model: 'doubao-seed-1-6-251015',
      messages: [
        {
          role: 'user',
          content: prompt.trim()
        }
      ],
      max_completion_tokens: request.generationConfig?.maxOutputTokens || 4096,
      temperature: request.generationConfig?.temperature || 0.7,
      reasoning_effort: 'medium'
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(doubaoRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Doubao API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      // Convert to Gemini format
      return {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: data.choices[0]?.message?.content || '豆包模型响应为空',
                },
              ],
              role: 'model',
            },
            finishReason: 'STOP',
            index: 0,
          },
        ],
        usageMetadata: {
          promptTokenCount: data.usage?.prompt_tokens || 0,
          candidatesTokenCount: data.usage?.completion_tokens || 0,
          totalTokenCount: data.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      throw new Error(`豆包API调用失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async generateContentStream(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // Extract text from request
    let prompt = '';
    if (request.contents) {
      for (const content of request.contents) {
        for (const part of content.parts) {
          if (part.text) {
            prompt += part.text + ' ';
          }
        }
      }
    }

    // Call Doubao API with stream enabled
    const doubaoRequest = {
      model: 'doubao-seed-1-6-251015',
      messages: [
        {
          role: 'user',
          content: prompt.trim()
        }
      ],
      max_completion_tokens: request.generationConfig?.maxOutputTokens || 4096,
      temperature: request.generationConfig?.temperature || 0.7,
      reasoning_effort: 'medium',
      stream: true,  // Enable streaming
    };

    const controller = new AbortController();

    async function* streamGenerator() {
      let accumulatedText = '';
      let totalPromptTokens = 0;
      let totalCompletionTokens = 0;

      try {
        const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
          body: JSON.stringify(doubaoRequest),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`豆包API错误: ${response.status} ${errorText}`);
        }

        if (!response.body) {
          throw new Error('豆包API响应体为空');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

          for (const line of lines) {
            const trimmedLine = line.trim();

            // Skip empty lines and comments
            if (!trimmedLine || trimmedLine.startsWith(':')) {
              continue;
            }

            // Parse SSE data format: "data: {...}"
            if (trimmedLine.startsWith('data: ')) {
              const jsonStr = trimmedLine.slice(6); // Remove "data: " prefix

              // Check for stream end signal
              if (jsonStr === '[DONE]') {
                break;
              }

              try {
                const chunk = JSON.parse(jsonStr);
                const delta = chunk.choices?.[0]?.delta;

                if (delta?.content) {
                  accumulatedText += delta.content;

                  // Update token counts if available
                  if (chunk.usage) {
                    totalPromptTokens = chunk.usage.prompt_tokens || 0;
                    totalCompletionTokens = chunk.usage.completion_tokens || 0;
                  }

                  // Yield a streaming chunk in Gemini format
                  yield {
                    candidates: [
                      {
                        content: {
                          parts: [
                            {
                              text: delta.content,
                            },
                          ],
                          role: 'model',
                        },
                        finishReason: chunk.choices[0]?.finish_reason === 'stop' ? 'STOP' : undefined,
                        index: 0,
                      },
                    ],
                    usageMetadata: {
                      promptTokenCount: totalPromptTokens,
                      candidatesTokenCount: totalCompletionTokens,
                      totalTokenCount: totalPromptTokens + totalCompletionTokens,
                    },
                  };
                }
              } catch (parseError) {
                // Log parsing errors but continue processing
                console.warn('豆包流式响应解析错误:', parseError, '原始数据:', jsonStr);
              }
            }
          }
        }

        // If no streaming chunks were received, yield a final empty response
        if (accumulatedText === '') {
          yield {
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: '豆包模型响应为空',
                    },
                  ],
                  role: 'model',
                },
                finishReason: 'STOP',
                index: 0,
              },
            ],
            usageMetadata: {
              promptTokenCount: 0,
              candidatesTokenCount: 0,
              totalTokenCount: 0,
            },
          };
        }
      } catch (error) {
        throw new Error(`豆包流式API调用失败: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // Bind 'this' context to the generator
    return streamGenerator.call(this);
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // Extract text from request
    let text = '';
    if (request.contents) {
      for (const content of request.contents) {
        for (const part of content.parts) {
          if (part.text) {
            text += part.text + ' ';
          }
        }
      }
    }

    // More accurate token estimation for Chinese + English mixed text
    // Chinese characters: ~1.5 tokens per character
    // English words: ~1 token per 4 characters
    // This is a heuristic, but more accurate than simple division

    const chineseCharCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const nonChineseText = text.replace(/[\u4e00-\u9fa5]/g, '');
    const englishTokens = Math.ceil(nonChineseText.length / 4);
    const chineseTokens = Math.ceil(chineseCharCount * 1.5);

    const estimatedTokens = chineseTokens + englishTokens;

    return {
      totalTokens: Math.max(estimatedTokens, 1), // At least 1 token
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('豆包模型暂不支持嵌入功能');
  }
}
