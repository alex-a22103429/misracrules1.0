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
                        'misracrulesProgress',
                        'MISRA-C RULES Progress',
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
                } catch (error: any) {
                    vscode.window.showErrorMessage(`Error communicating with MISRA-C RULES: ${(error as Error).message}`);
                }
            } else {
                vscode.window.showWarningMessage('No code snippet selected. Please select a code snippet before using MISRA-C RULES.');
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
    }).then((apiKey: string | undefined) => {
        if (apiKey) {
            // Use the apiKey as needed with OpenAIAPI
            OpenAIAPI.setApiKey(apiKey);

            vscode.window.showInformationMessage('API key updated successfully.');
        } else {
            vscode.window.showErrorMessage('No API key entered. Please provide a valid API key.');
        }
    });
}

export function deactivate() {}
