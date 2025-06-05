const menuInput = document.getElementById("menuInput");
const addBtn = document.getElementById("addBtn");
const menuList = document.getElementById("menuList");
const pickBtn = document.getElementById("pickBtn");
const resetBtn = document.getElementById("resetBtn");
const resultCard = document.getElementById("resultCard");
const recent = document.getElementById("recent");

let menus = JSON.parse(localStorage.getItem("menus")) || [];
let lastPicked = null;

function renderMenus() {
  menuList.innerHTML = "";
  menus.forEach((menu, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${menu}
      <button onclick="deleteMenu(${index})">삭제</button>
    `;
    menuList.appendChild(li);
  });
}

function addMenu() {
  const newMenu = menuInput.value.trim();
  if (!newMenu) return;
  if (menus.includes(newMenu)) {
    alert("이미 있는 메뉴예요!");
    return;
  }
  menus.push(newMenu);
  localStorage.setItem("menus", JSON.stringify(menus));
  menuInput.value = "";
  renderMenus();
}

function deleteMenu(index) {
  menus.splice(index, 1);
  localStorage.setItem("menus", JSON.stringify(menus));
  renderMenus();
}

function pickMenu() {
  if (menus.length === 0) {
    alert("메뉴를 입력해주세요");
    return;
  }

  resultCard.classList.add("hidden");

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * menus.length);
    const picked = menus[randomIndex];
    lastPicked = picked;
    resultCard.innerHTML = `🍽️ 오늘의 메뉴는 <strong>${picked}</strong>입니다!`;
    resultCard.classList.remove("hidden");
    recent.innerHTML = `최근 선택: ${picked} <button onclick="shareMenu()">공유하기</button>`;
  }, 500);
}

function resetApp() {
  if (confirm("모든 메뉴를 삭제하고 초기화할까요?")) {
    menus = [];
    localStorage.removeItem("menus");
    renderMenus();
    resultCard.classList.add("hidden");
    recent.innerHTML = "";
  }
}

function shareMenu() {
  if (navigator.share) {
    navigator.share({
      title: "오늘 뭐먹지?",
      text: `오늘의 메뉴는 "${lastPicked}"입니다!`,
      url: window.location.href,
    });
  } else {
    alert("이 기기에서는 공유 기능을 사용할 수 없어요.");
  }
}

addBtn.addEventListener("click", addMenu);
pickBtn.addEventListener("click", pickMenu);
resetBtn.addEventListener("click", resetApp);
renderMenus();
