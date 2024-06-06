chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isEnabled: true });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('isEnabled', (data) => {
      chrome.storage.sync.set({ isEnabled: !data.isEnabled }, () => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      });
    });
  });
  