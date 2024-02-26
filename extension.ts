// extension.ts
import * as vscode from 'vscode';
import { OpenAIAPI } from './openai';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.misracrules', async () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            if (selectedText) {
                try {
                    // Display WebView with progress bar
                    const panel = vscode.window.createWebviewPanel(
                        'chatGPTProgress',
                        'ChatGPT Progress',
                        vscode.ViewColumn.Two,
                        {
                            enableScripts: true,
                        }
                    );

                    panel.webview.html = getWebViewContent();

                    // Simulate processing task
                    await simulateProcessing(panel);

                    // Close the WebView when processing is complete
                    panel.dispose();
                } catch (error) {
                    vscode.window.showErrorMessage(`Error communicating with ChatGPT: ${error.message}`);
                }
            } else {
                vscode.window.showWarningMessage('No code snippet selected. Please select a code snippet before using ChatGPT.');
            }
        }
    });

    context.subscriptions.push(disposable);

    // Add a command for setting the API key
    context.subscriptions.push(vscode.commands.registerCommand('extension.setApiKey', setApiKey));
}

function getWebViewContent() {
    const extensionPath = vscode.extensions.getExtension('alex-a22103429.misracrules')?.extensionPath || '';
    const webViewPath = vscode.Uri.file(extensionPath + '/webview/index.html');
    return webViewPath.fsPath;
}

async function simulateProcessing(panel: vscode.WebviewPanel) {
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
}

function setApiKey() {
    vscode.window.showInputBox({
        prompt: 'Enter your new OpenAI API key',
        placeHolder: 'API Key',
        password: true,
    }).then(apiKey => {
        if (apiKey) {
            vscode.workspace.getConfiguration().update('misracrules.apiKey', apiKey, true);
            vscode.window.showInformationMessage('API key updated successfully.');
        }
    });
}

export function deactivate() {}
