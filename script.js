const menuInput = document.getElementById("menuInput");
const addButton = document.getElementById("addButton");
const pickButton = document.getElementById("pickButton");
const resetButton = document.getElementById("resetButton");
const menuList = document.getElementById("menuList");
const resultBox = document.getElementById("resultBox");
const result = document.getElementById("result");
const lastPicked = document.getElementById("lastPicked");

let menus = JSON.parse(localStorage.getItem("menus")) || [];
let lastMenu = localStorage.getItem("lastPicked");

function renderMenus() {
  menuList.innerHTML = "";
  menus.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("touchstart", handleTouchStart, { passive: true });
    li.addEventListener("touchend", e => handleTouchEnd(e, index));
    menuList.appendChild(li);
  });
}

let touchStartX = 0;
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e, index) {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    menus.splice(index, 1);
    localStorage.setItem("menus", JSON.stringify(menus));
    renderMenus();
  }
}

function addMenu() {
  const newMenu = menuInput.value.trim();
  if (newMenu) {
    menus.push(newMenu);
    localStorage.setItem("menus", JSON.stringify(menus));
    renderMenus();
    menuInput.value = "";
  }
}

function pickMenu() {
  if (menus.length === 0) {
    alert("메뉴를 입력해주세요");
    return;
  }
  const index = Math.floor(Math.random() * menus.length);
  const selected = menus[index];
  result.textContent = selected;
  resultBox.classList.remove("hidden");
  localStorage.setItem("lastPicked", selected);
  lastPicked.textContent = `최근 선택: ${selected}`;
}

function resetApp() {
  if (confirm("정말 초기화하시겠습니까?")) {
    menus = [];
    localStorage.clear();
    resultBox.classList.add("hidden");
    lastPicked.textContent = "";
    renderMenus();
  }
}

addButton.addEventListener("click", addMenu);
pickButton.addEventListener("click", pickMenu);
resetButton.addEventListener("click", resetApp);
menuInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addMenu();
});

if (lastMenu) {
  lastPicked.textContent = `최근 선택: ${lastMenu}`;
}

renderMenus();
