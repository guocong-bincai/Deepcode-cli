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
    // For simplicity, just return the normal response as a single stream item
    const response = await this.generateContent(request, userPromptId);
    
    async function* streamGenerator() {
      yield response;
    }
    
    return streamGenerator();
  }

  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    // Simple token estimation
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
    
    const estimatedTokens = Math.ceil(text.length / 4); // Rough estimate
    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    throw new Error('豆包模型暂不支持嵌入功能');
  }
}
