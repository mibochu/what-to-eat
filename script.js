:root {
    --bg: #ffffff;
    --text: #000000;
    --primary: #007aff;
    --danger: #ff3b30;
    --favorite: #ffcc00;
    --item-bg: #f1f1f1;
    --scrollbar: transparent;
  }
  
  [data-theme="dark"] {
    --bg: #1c1c1e;
    --text: #f2f2f7;
    --item-bg: #2c2c2e;
    --scrollbar: transparent;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s, color 0.3s;
  }
  
  .container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  #themeToggle {
    font-size: 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .input-group {
    position: relative;
  }
  
  #menuInput {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  #autocompleteList {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg);
    border: 1px solid #ccc;
    border-top: none;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  #autocompleteList li {
    padding: 10px;
    cursor: pointer;
  }
  
  #autocompleteList li:hover {
    background: var(--item-bg);
  }
  
  .toggle-group {
    margin: 10px 0;
    font-size: 0.9rem;
  }
  
  #menuList {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 216px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  #menuList::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  
  #menuList li {
    background: var(--item-bg);
    padding: 10px 14px;
    border-radius: 10px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  #menuList li span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .star-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: var(--favorite);
    cursor: pointer;
  }
  
  .delete-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--danger);
    cursor: pointer;
  }
  
  #pickButton {
    width: 100%;
    padding: 14px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;
  }
  
  #result {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
  }
  
  .spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--item-bg);
    height: 40px;
    border-radius: 8px;
  }
  
  .spinner {
    border: 3px solid #ccc;
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
