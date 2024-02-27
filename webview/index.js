// webview/index.js
const startButton = document.getElementById('start-button');
const setApiKeyButton = document.getElementById('set-api-key'); // Added this line
const apiKeyInput = document.getElementById('api-key'); // Added this line
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Added this function for setting the API key
setApiKeyButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        // You can perform additional validation or send the API key to your extension
        console.log(`API key set: ${apiKey}`);
        // You may want to send the API key to your extension or OpenAIAPI class here
    } else {
        alert('Please enter a valid API key.'); // You can use a more sophisticated alert or error handling
    }
});

startButton.addEventListener('click', () => {
    // Simulate a processing task
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;

        if (progress >= 100) {
            clearInterval(interval);
            progressText.textContent = 'Processing complete!';
        } else {
            progressText.textContent = `Processing... ${progress}%`;
        }
    }, 500);
});
