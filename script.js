let menuItems = JSON.parse(localStorage.getItem("menus")) || [];
const menuInput = document.getElementById("menuInput");
const menuList = document.getElementById("menuList");
const autocompleteList = document.getElementById("autocompleteList");
const pickButton = document.getElementById("pickButton");
const result = document.getElementById("result");
const toggleFavorites = document.getElementById("toggleFavorites");
const themeToggle = document.getElementById("themeToggle");

// 🌗 테마 설정
function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  loadTheme();
});

loadTheme();

function saveToStorage() {
  localStorage.setItem("menus", JSON.stringify(menuItems));
}

function renderMenu() {
  menuList.innerHTML = "";
  const showOnlyFavorites = toggleFavorites.checked;
  menuItems.forEach((item, index) => {
    if (showOnlyFavorites && !item.favorite) return;

    const li = document.createElement("li");

    const content = document.createElement("span");
    content.innerHTML = `${item.name} <button class="star-btn">${item.favorite ? "⭐" : "☆"}</button>`;
    content.querySelector("button").onclick = () => {
      menuItems[index].favorite = !menuItems[index].favorite;
      saveToStorage();
      renderMenu();
    };

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "❌";
    del.title = "삭제";
    del.onclick = () => {
      menuItems.splice(index, 1);
      saveToStorage();
      renderMenu();
    };

    li.appendChild(content);
    li.appendChild(del);
    menuList.appendChild(li);
  });
}

menuInput.addEventListener("input", () => {
  showAutocomplete(menuInput.value.trim());
});

menuInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = menuInput.value.trim();
    if (value && !isDuplicate(value)) {
      menuItems.push({ name: value, favorite: false });
      saveToStorage();
      renderMenu();
    }
    menuInput.value = "";
    autocompleteList.innerHTML = "";
  }
});

function isDuplicate(newItem) {
  return menuItems.some(item => item.name === newItem || item.name.includes(newItem) || newItem.includes(item.name));
}

function showAutocomplete(value) {
  autocompleteList.innerHTML = "";
  if (!value) return;
  const matches = menuItems.filter(item => item.name.includes(value) && item.name !== value);
  matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = match.name;
    li.addEventListener("click", () => {
      menuInput.value = match.name;
      autocompleteList.innerHTML = "";
    });
    autocompleteList.appendChild(li);
  });
}

pickButton.addEventListener("click", () => {
  if (menuItems.length === 0) {
    alert("메뉴를 먼저 입력해주세요!");
    return;
  }

  result.innerHTML = `<div class="spinner-wrapper"><div class="spinner"></div></div>`;

  setTimeout(() => {
    const pick = getRandomItem();
    result.textContent = `오늘은 "${pick.name}" 어때요? 🍴`;
  }, 1500);
});

function getRandomItem() {
  return menuItems[Math.floor(Math.random() * menuItems.length)];
}

toggleFavorites.addEventListener("change", renderMenu);

// 초기 렌더링
renderMenu();
