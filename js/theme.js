const btn = document.getElementById('theme-toggle');
const body = document.body;

// Aplicar el tema guardado (si existe)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-bs-theme', savedTheme);
  if (btn) btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Cambiar y guardar el tema
if (btn) {
  btn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}
