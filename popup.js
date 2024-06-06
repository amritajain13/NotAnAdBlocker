document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
  
    chrome.storage.sync.get('isEnabled', (data) => {
      updateButton(data.isEnabled);
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.storage.sync.get('isEnabled', (data) => {
        const newStatus = !data.isEnabled;
        chrome.storage.sync.set({ isEnabled: newStatus }, () => {
          updateButton(newStatus);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['content.js']
            });
          });
        });
      });
    });
  
    function updateButton(isEnabled) {
      toggleButton.textContent = isEnabled ? 'Disable' : 'Enable';
    }
  });
  