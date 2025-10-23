// Obtener el body
const body = document.body;

// Recuperar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-bs-theme', savedTheme);
}

// Manejar botón si existe
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
