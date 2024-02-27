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
exports.activate = void 0;
// extension.ts
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
function activate(context) {
    // Register command to open MISRA-C Rules view
    const misraRulesDisposable = vscode.commands.registerCommand('extension.misracrules', () => {
        const panel = vscode.window.createWebviewPanel('misraRules', // Identifies the type of the webview. Used internally
        'MISRA-C Rules', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
            enableScripts: true, // Enable scripts in the webview
        });
        // Get the path to the webview's HTML file on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'webview/misracRules/index.html'));
        const htmlPath = panel.webview.asWebviewUri(onDiskPath);
        // Set the HTML content in the webview
        panel.webview.html = getWebviewContent(htmlPath);
    });
    context.subscriptions.push(misraRulesDisposable);
    // Register command to open Set API Key view
    const setApiKeyDisposable = vscode.commands.registerCommand('extension.setApiKey', () => {
        const panel = vscode.window.createWebviewPanel('setApiKey', // Identifies the type of the webview. Used internally
        'Set API Key', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
            enableScripts: true, // Enable scripts in the webview
        });
        // Get the path to the webview's HTML file on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'webview/setApiKey/index.html'));
        const htmlPath = panel.webview.asWebviewUri(onDiskPath);
        // Set the HTML content in the webview
        panel.webview.html = getWebviewContent(htmlPath);
    });
    context.subscriptions.push(setApiKeyDisposable);
}
exports.activate = activate;
// Function to get the HTML content of the webview
function getWebviewContent(htmlPath) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webview</title>
    </head>
    <body>
        <iframe src="${htmlPath}" width="100%" height="100%"></iframe>
    </body>
    </html>`;
}
//# sourceMappingURL=extension.js.map