// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.contentScriptQuery === 'fetchDuolingoData') {
    console.log('---------- test');
    fetch('https://www.duolingo.com/learn')
      .then(response => response.text())
      .then(text => sendResponse({html: text}))
      .catch(error => console.log('Error fetching data:', error));
    return true;  // Will respond asynchronously.
  }
});
