// extension.ts
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Register command to open MISRA-C Rules view
    const misraRulesDisposable = vscode.commands.registerCommand('extension.misracrules', () => {
        const panel = vscode.window.createWebviewPanel(
            'misraRules', // Identifies the type of the webview. Used internally
            'MISRA-C Rules', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable scripts in the webview
            }
        );

        // Get the path to the webview's HTML file on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'webview/misracRules/index.html'));
        const htmlPath = panel.webview.asWebviewUri(onDiskPath);

        // Set the HTML content in the webview
        panel.webview.html = getWebviewContent(htmlPath);
    });
    context.subscriptions.push(misraRulesDisposable);

    // Register command to open Set API Key view
    const setApiKeyDisposable = vscode.commands.registerCommand('extension.setApiKey', () => {
        const panel = vscode.window.createWebviewPanel(
            'setApiKey', // Identifies the type of the webview. Used internally
            'Set API Key', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable scripts in the webview
            }
        );

        // Get the path to the webview's HTML file on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'webview/setApiKey/index.html'));
        const htmlPath = panel.webview.asWebviewUri(onDiskPath);

        // Set the HTML content in the webview
        panel.webview.html = getWebviewContent(htmlPath);
    });
    context.subscriptions.push(setApiKeyDisposable);
}

// Function to get the HTML content of the webview
function getWebviewContent(htmlPath: vscode.Uri) {
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
