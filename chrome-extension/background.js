chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'IMPORT_LISTING') {
    // Send data to Next.js API
    fetch('http://localhost:3000/api/crm/import-listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message.payload)
    })
    .then(response => {
      if (response.ok) {
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, error: 'Server returned error' });
      }
    })
    .catch(error => {
      console.error('Error importing listing:', error);
      sendResponse({ success: false, error: error.message });
    });

    return true; // Keep the message channel open for async response
  }
});
