const menuInput = document.getElementById('menuInput');
const addBtn = document.getElementById('addBtn');
const menuList = document.getElementById('menuList');
const pickBtn = document.getElementById('pickBtn');
const resetBtn = document.getElementById('resetBtn');
const result = document.getElementById('result');

let menuItems = JSON.parse(localStorage.getItem('menus')) || [];

function saveMenus() {
  localStorage.setItem('menus', JSON.stringify(menuItems));
}

function renderMenus() {
  menuList.innerHTML = '';
  menuItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item}</span>
      <button onclick="deleteMenu(${index})">삭제</button>
    `;
    menuList.appendChild(li);
  });
}

function deleteMenu(index) {
  menuItems.splice(index, 1);
  saveMenus();
  renderMenus();
}

addBtn.onclick = () => {
  const newItem = menuInput.value.trim();
  if (newItem) {
    menuItems.push(newItem);
    saveMenus();
    renderMenus();
    menuInput.value = '';
  }
};

pickBtn.onclick = () => {
  if (menuItems.length === 0) {
    alert('메뉴를 입력해주세요');
    return;
  }

  const random = Math.floor(Math.random() * menuItems.length);
  const picked = menuItems[random];

  result.textContent = picked;
  result.classList.remove('hidden');
  result.classList.add('show');

  setTimeout(() => {
    result.classList.remove('show');
  }, 1000);
};

resetBtn.onclick = () => {
  if (confirm('모든 메뉴를 삭제하고 초기화할까요?')) {
    menuItems = [];
    saveMenus();
    renderMenus();
    result.classList.add('hidden');
  }
};

renderMenus();
