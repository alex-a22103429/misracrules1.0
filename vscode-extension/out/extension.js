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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
// Function to prompt for API key
function promptForApiKey() {
    return vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API key',
        placeHolder: 'API Key',
    });
}
// Function to send prompts to OpenAI
function sendToOpenAI(apiKey, prompt) {
    // Implement logic to send prompt to OpenAI using the apiKey
    // You may want to use an HTTP library or the OpenAI API SDK
}
// Function to adapt code with MISRA C rules
function adaptCodeWithMisraC(selectedCode) {
    // Implement logic to adapt the code with MISRA C rules
    // You can use regular expressions or a code analysis library
    return selectedCode;
}
// Register command to trigger the extension
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.adaptCode', () => __awaiter(this, void 0, void 0, function* () {
        const apiKey = yield promptForApiKey();
        if (!apiKey) {
            vscode.window.showErrorMessage('API Key is required to proceed.');
            return;
        }
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selectedCode = editor.document.getText(editor.selection);
            const adaptedCode = adaptCodeWithMisraC(selectedCode);
            sendToOpenAI(apiKey, adaptedCode);
        }
        else {
            vscode.window.showWarningMessage('No code selected.');
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
