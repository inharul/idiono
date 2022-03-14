chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.open('index.html', '_blank');
    }
});