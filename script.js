const menuInput = document.getElementById("menuInput");
const addButton = document.getElementById("addButton");
const menuList = document.getElementById("menuList");
const pickButton = document.getElementById("pickButton");
const resetButton = document.getElementById("resetButton");

function addMenu(text) {
  const item = document.createElement("div");
  item.className = "menu-item";

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-button";
  deleteBtn.onclick = () => item.remove();

  item.appendChild(span);
  item.appendChild(deleteBtn);
  menuList.appendChild(item);
}

addButton.onclick = () => {
  const text = menuInput.value.trim();
  if (text) {
    addMenu(text);
    menuInput.value = "";
  }
};

menuInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addButton.click();
  }
});

pickButton.onclick = () => {
  const items = document.querySelectorAll(".menu-item");
  if (items.length === 0) return;

  const index = Math.floor(Math.random() * items.length);
  items.forEach((item, i) => {
    item.classList.toggle("highlight", i === index);
  });
};

resetButton.onclick = () => {
  menuList.innerHTML = "";
};
const selectedResult = document.getElementById("selectedResult");

pickButton.onclick = () => {
  const items = document.querySelectorAll(".menu-item");
  if (items.length === 0) {
    selectedResult.textContent = ""; // 아무것도 없을 땐 지우기
    return;
  }

  const index = Math.floor(Math.random() * items.length);
  items.forEach((item, i) => {
    item.classList.toggle("highlight", i === index);
  });

  const selectedMenu = items[index].querySelector("span").textContent;
  selectedResult.textContent = `선택된 메뉴: ${selectedMenu}`;
};

resetButton.onclick = () => {
  menuList.innerHTML = "";
  selectedResult.textContent = "";
};

