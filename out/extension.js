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
exports.deactivate = exports.activate = void 0;
// extension.ts
const vscode = __importStar(require("vscode"));
const openai_1 = require("./openai");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.misracrules', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (selectedText) {
                try {
                    // Display WebView with progress bar
                    const panel = vscode.window.createWebviewPanel('misracrulesProgress', 'MISRA-C RULES Progress', vscode.ViewColumn.Two, {
                        enableScripts: true,
                    });
                    panel.webview.html = getWebViewContent();
                    // Simulate processing task
                    yield simulateProcessing(panel);
                    // Close the WebView when processing is complete
                    panel.dispose();
                }
                catch (error) {
                    vscode.window.showErrorMessage(`Error communicating with MISRA-C RULES: ${error.message}`);
                }
            }
            else {
                vscode.window.showWarningMessage('No code snippet selected. Please select a code snippet before using MISRA-C RULES.');
            }
        }
    }));
    context.subscriptions.push(disposable);
    // Add a command for setting the API key
    context.subscriptions.push(vscode.commands.registerCommand('extension.setApiKey', setApiKey));
}
exports.activate = activate;
function getWebViewContent() {
    var _a;
    const extensionPath = ((_a = vscode.extensions.getExtension('alex-a22103429.misracrules')) === null || _a === void 0 ? void 0 : _a.extensionPath) || '';
    const webViewPath = vscode.Uri.file(extensionPath + '/webview/index.html');
    return webViewPath.fsPath;
}
function simulateProcessing(panel) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simulate a processing task
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            panel.webview.postMessage({ command: 'updateProgress', progress });
            if (progress >= 100) {
                clearInterval(interval);
                panel.webview.postMessage({ command: 'completeProcessing' });
            }
        }, 500);
    });
}
function setApiKey() {
    vscode.window.showInputBox({
        prompt: 'Enter your new OpenAI API key',
        placeHolder: 'API Key',
        password: true,
    }).then((apiKey) => {
        if (apiKey) {
            // Use the apiKey as needed with OpenAIAPI
            openai_1.OpenAIAPI.setApiKey(apiKey);
            vscode.window.showInformationMessage('API key updated successfully.');
        }
        else {
            vscode.window.showErrorMessage('No API key entered. Please provide a valid API key.');
        }
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map