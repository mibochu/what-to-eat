const menuInput = document.getElementById('menu-input');
const addMenuBtn = document.getElementById('add-menu');
const pickMenuBtn = document.getElementById('pick-menu');
const resetBtn = document.getElementById('reset');
const menuList = document.getElementById('menu-list');
const result = document.getElementById('result');

// 메뉴 추가
function addMenu() {
  const menu = menuInput.value.trim();
  if (menu === '') return;

  const li = document.createElement('li');
  li.className = 'menu-item';
  li.innerHTML = `
    <span class="menu-text">${menu}</span>
    <button class="delete-btn">✖</button>
  `;

  menuList.appendChild(li);
  menuInput.value = '';

  // 삭제 버튼
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  // 스와이프 삭제 기능
  let startX = 0, currentX = 0, holding = false;

  li.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    holding = true;
    li.classList.add('swipe-hold');
  });

  li.addEventListener('touchmove', e => {
    if (!holding) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    if (diff < 0) {
      li.style.transform = `translateX(${diff}px)`;
    }
  });

  li.addEventListener('touchend', () => {
    holding = false;
    li.classList.remove('swipe-hold');
    const diff = currentX - startX;
    if (diff < -100) {
      li.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      li.style.transform = 'translateX(-100%)';
      li.style.opacity = '0';
      setTimeout(() => li.remove(), 300);
    } else {
      li.style.transition = 'transform 0.2s ease';
      li.style.transform = 'translateX(0)';
    }
  });
}

// Enter 키로도 추가
menuInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addMenu();
});

addMenuBtn.addEventListener('click', addMenu);

// 메뉴 뽑기
pickMenuBtn.addEventListener('click', () => {
  const items = document.querySelectorAll('.menu-text');
  if (items.length === 0) return;

  const i = Math.floor(Math.random() * items.length);
  const selected = items[i].textContent;

  result.textContent = `🍽️ 오늘의 메뉴는 ${selected}입니다!`;
  result.classList.remove('hidden');
  result.classList.add('result');
});

// 초기화
resetBtn.addEventListener('click', () => {
  menuList.innerHTML = '';
  result.textContent = '';
  result.classList.add('hidden');
});
