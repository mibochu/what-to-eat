const input = document.getElementById("menuInput");
const addButton = document.getElementById("addButton");
const pickButton = document.getElementById("pickButton");
const resetButton = document.getElementById("resetButton");
const menuList = document.getElementById("menuList");
const resultDiv = document.getElementById("result");

// 메뉴 불러오기
let menus = JSON.parse(localStorage.getItem("menus")) || [];
renderMenus();

// 메뉴 추가 (Enter 또는 버튼)
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addMenu();
});
addButton.addEventListener("click", addMenu);

function addMenu() {
  const value = input.value.trim();
  if (value === "") return;
  menus.push(value);
  localStorage.setItem("menus", JSON.stringify(menus));
  input.value = "";
  renderMenus();
}

// 메뉴 삭제 (스와이프)
function enableSwipeToDelete(li, index) {
  let startX = 0;
  li.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  li.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 80) {
      menus.splice(index, 1);
      localStorage.setItem("menus", JSON.stringify(menus));
      renderMenus();
    }
  });
}

// 메뉴 렌더링
function renderMenus() {
  menuList.innerHTML = "";
  menus.forEach((menu, index) => {
    const li = document.createElement("li");
    li.textContent = menu;
    enableSwipeToDelete(li, index);
    menuList.appendChild(li);
  });
}

// 랜덤 선택
pickButton.addEventListener("click", () => {
  if (menus.length === 0) {
    alert("메뉴를 입력해주세요");
    return;
  }

  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = "🍽️ 오늘의 메뉴는...";

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * menus.length);
    const pick = menus[randomIndex];
    resultDiv.innerHTML = `🍽️ <strong>오늘의 메뉴는 ${pick}입니다!</strong>`;
  }, 700);
});

// 초기화
resetButton.addEventListener("click", () => {
  if (confirm("모든 메뉴를 삭제하시겠어요?")) {
    menus = [];
    localStorage.removeItem("menus");
    resultDiv.classList.add("hidden");
    renderMenus();
  }
});
