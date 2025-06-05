const menuInput = document.getElementById('menuInput');
const addButton = document.getElementById('addButton');
const menuList = document.getElementById('menuList');
const randomButton = document.getElementById('randomButton');
const resetButton = document.getElementById('resetButton');
const result = document.getElementById('result');

let menus = [];

function renderMenus() {
  menuList.innerHTML = '';
  menus.forEach((menu, index) => {
    const li = document.createElement('li');
    li.textContent = menu;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      menus.splice(index, 1);
      renderMenus();
    };

    li.appendChild(deleteBtn);
    addSwipeEvents(li, index);
    menuList.appendChild(li);
  });
}

function addSwipeEvents(el, index) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  el.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    el.classList.add('hold');
  });

  el.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    if (diffX < 0) {
      el.style.transform = `translateX(${diffX}px)`;
    }
  });

  el.addEventListener('touchend', () => {
    isDragging = false;
    el.classList.remove('hold');
    const diffX = currentX - startX;
    if (diffX < -80) {
      menus.splice(index, 1);
      renderMenus();
    } else {
      el.style.transform = 'translateX(0)';
    }
  });
}

addButton.addEventListener('click', () => {
  const menu = menuInput.value.trim();
  if (menu !== '') {
    menus.push(menu);
    menuInput.value = '';
    renderMenus();
  }
});

menuInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});

randomButton.addEventListener('click', () => {
  if (menus.length === 0) {
    result.textContent = '메뉴를 추가해주세요!';
    return;
  }

  result.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    result.textContent = menus[i % menus.length];
    i++;
  }, 80);

  setTimeout(() => {
    clearInterval(interval);
    const final = menus[Math.floor(Math.random() * menus.length)];
    result.textContent = `오늘은 "${final}" 어때요?`;
  }, 1000);
});

resetButton.addEventListener('click', () => {
  menus = [];
  renderMenus();
  result.textContent = '';
});
