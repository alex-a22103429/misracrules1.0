"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIAPI = void 0;
// openai.ts
const axios_1 = __importDefault(require("axios"));
class OpenAIAPI {
    static setApiKey(apiKey) {
        OpenAIAPI.apiKey = apiKey;
    }
    static sendToChatGPT(codeSnippet) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `I chatgpt, I want you to fix this:\n${codeSnippet}`;
            const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Update with the appropriate API endpoint
            try {
                const response = yield axios_1.default.post(apiUrl, {
                    prompt,
                    max_tokens: 150,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OpenAIAPI.apiKey}`,
                    },
                });
                return ((_a = response.data.choices[0]) === null || _a === void 0 ? void 0 : _a.text) || '';
            }
            catch (error) {
                throw new Error(`OpenAI API request failed: ${error.message}`);
            }
        });
    }
}
exports.OpenAIAPI = OpenAIAPI;
OpenAIAPI.apiKey = '';
//# sourceMappingURL=openai.js.map