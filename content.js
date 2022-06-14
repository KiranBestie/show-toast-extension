const showToast = (message) => {
  //append html element to webpage
  let toastContainer = document.createElement("div");
  toastContainer.innerText = message;
  toastContainer.className = "toast";
  document.body.appendChild(toastContainer);

  //remove element after 2 seconds
  setTimeout(() => {
    document.body.removeChild(toastContainer);
  }, 2000);
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if ("toastMessage" in request) {
    showToast(request.toastMessage);
    sendResponse({ status: "OK" });
  } else {
    sendResponse({ status: "FAIL", message: "toastMessage not provided" });
  }
});
