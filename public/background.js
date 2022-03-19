chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        window.open('index.html', '_blank');
    }
});