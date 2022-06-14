const sendMessage = (toastMessage) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {
      toastMessage: toastMessage,
    });
  });
};
chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  if (menuItemId === "show-toast") {
    chrome.storage.sync.get(["message"], ({ message }) => {
      sendMessage(message);
    });
  }
});
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "show-toast",
    title: "Show Toast!",
    contexts: ["all"],
  });
  // default message when extension is installed for the first time
  chrome.storage.sync.set({ message: "Hello! This is the default greeting!" });
});
