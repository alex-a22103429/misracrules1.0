// webview/index.js
const startButton = document.getElementById('start-button');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

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