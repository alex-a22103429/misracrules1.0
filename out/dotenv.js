"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import OpenAIAPI
const openai_1 = require("./openai");
// Import and configure dotenv
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Access the API key
const apiKey = process.env.OPENAI_API_KEY;
// Check if the API key is available
if (!apiKey) {
    console.error('OpenAI API key is missing. Make sure to set it in the .env file.');
    process.exit(1); // Exit the process if the API key is missing
}
// Use the apiKey as needed with OpenAIAPI
openai_1.OpenAIAPI.setApiKey(apiKey);
//# sourceMappingURL=dotenv.js.map