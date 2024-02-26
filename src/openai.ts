// openai.ts
import axios from 'axios';

export class OpenAIAPI {
    private static apiKey: string = '';

    static setApiKey(apiKey: string): void {
        OpenAIAPI.apiKey = apiKey;
    }

    static async sendToChatGPT(codeSnippet: string): Promise<string> {
        const prompt = `I chatgpt, I want you to fix this:\n${codeSnippet}`;

        const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Update with the appropriate API endpoint

        try {
            const response = await axios.post(
                apiUrl,
                {
                    prompt,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OpenAIAPI.apiKey}`,
                    },
                }
            );

            return response.data.choices[0]?.text || '';
        } catch (error) {
            throw new Error(`OpenAI API request failed: ${(error as Error).message}`);
        }
    }
}
