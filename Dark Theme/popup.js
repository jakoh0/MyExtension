document.getElementById("toggle-dark-mode").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleDarkMode,
      });
    }
  });
  
  function toggleDarkMode() {
    const styleId = "dark-theme-style";
    let style = document.getElementById(styleId);
  
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        * {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
          border-color: #333 !important;
        }
        a {
          color: #bb86fc !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      style.remove();
    }
  }
  