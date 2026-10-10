const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const safeToggle = document.getElementById('safeToggle');
const demoState = document.getElementById('demoState');
const toggles = [...document.querySelectorAll('.toggle')];
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
function setSafeMode(on) {
  safeToggle.classList.toggle('on', on);
  safeToggle.setAttribute('aria-pressed', String(on));
  demoState.textContent = `Safe Mode: ${on ? 'ON' : 'OFF'}`;
  document.getElementById('disableAll').textContent = on ? 'Все функции отключены' : 'Отключить все функции';
  toggles.forEach(t => t.classList.toggle('on', !on && t.dataset.defaultOn === 'true'));
}
toggles.forEach((t, i) => {
  t.dataset.defaultOn = t.classList.contains('on') ? 'true' : 'false';
  t.tabIndex = 0;
  t.setAttribute('role', 'switch');
  t.setAttribute('aria-checked', String(t.classList.contains('on')));
  const flip = () => {
    if (safeToggle.classList.contains('on')) {
      showToast('Сначала выключи Safe Mode, чтобы менять демо-переключатели.');
      return;
    }
    t.classList.toggle('on');
    t.setAttribute('aria-checked', String(t.classList.contains('on')));
  };
  t.addEventListener('click', flip);
  t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
});
safeToggle.addEventListener('click', () => {
  const on = !safeToggle.classList.contains('on');
  setSafeMode(on);
  showToast(on ? 'Safe Mode включён: демо-функции выключены.' : 'Safe Mode выключен.');
});
document.getElementById('disableAll').addEventListener('click', () => {
  setSafeMode(true);
  showToast('Все демонстрационные функции отключены.');
});
document.getElementById('downloadBtn').addEventListener('click', () => {
  showToast('Архив проекта пока не прикреплён. Это демонстрационная страница.');
});
