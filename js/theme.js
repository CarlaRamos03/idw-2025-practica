const body = document.body;
const savedTheme = localStorage.getItem('theme');

// Aplicar tema guardado automáticamente
if (savedTheme) {
  body.setAttribute('data-bs-theme', savedTheme);
}

// Manejar botón de cambio de tema solo si existe
const btn = document.getElementById('theme-toggle');
if (btn) {
  // Actualizar texto del botón según tema guardado
  if (savedTheme) btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  // Cambiar tema al hacer click
  btn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}
