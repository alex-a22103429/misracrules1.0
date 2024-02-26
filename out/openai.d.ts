export declare class OpenAIAPI {
    private static apiKey;
    static setApiKey(apiKey: string): void;
    static sendToChatGPT(codeSnippet: string): Promise<string>;
}
