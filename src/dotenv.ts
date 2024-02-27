// Import OpenAIAPI
import { OpenAIAPI } from './openai';
// Import and configure dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// Access the API key
const apiKey = process.env.OPENAI_API_KEY;

// Check if the API key is available
if (!apiKey) {
    console.error('OpenAI API key is missing. Make sure to set it in the .env file.');
    process.exit(1); // Exit the process if the API key is missing
}

// Use the apiKey as needed with OpenAIAPI
OpenAIAPI.setApiKey(apiKey);
