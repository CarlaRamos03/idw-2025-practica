document.addEventListener('DOMContentLoaded', function () {

    // ==========================
    // FUNCIONES AUXILIARES
    // ==========================
    function obtenerMedicos() {
        return JSON.parse(localStorage.getItem('medicos')) || [];
    }

    function guardarMedicos(medicos) {
        localStorage.setItem('medicos', JSON.stringify(medicos));
    }

    function generarId() {
        return Date.now(); // ID único basado en timestamp
    }

    // ==========================
    // ALTA DE MEDICOS
    // ==========================
    const formAlta = document.getElementById('form-alta');
    const mensajeAlta = document.getElementById('mensaje-alta');

    if (formAlta) {
        formAlta.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const especialidad = document.getElementById('especialidad').value.trim();
            const obras = document.getElementById('obras').value.trim();

            if (!nombre || !especialidad || !obras) {
                alert('Por favor completá todos los campos.');
                return;
            }

            const nuevoMedico = {
                id: generarId(),
                nombre,
                especialidad,
                obras,
                img: "img/medico.png",
                horarios: "A confirmar",
                consultorio: "A asignar",
                matricula: "En trámite",
                descripcion: "Información adicional próximamente."
            };

            const medicos = obtenerMedicos();
            medicos.push(nuevoMedico);
            guardarMedicos(medicos);

            mensajeAlta.style.color = 'green';
            mensajeAlta.textContent = `Médico "${nombre}" registrado correctamente.`;
            formAlta.reset();

            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        });
    }

    // ==========================
    // BAJA DE MEDICOS
    // ==========================
    const formBaja = document.getElementById('form-baja');
    const mensajeBaja = document.getElementById('mensaje-baja');

    if (formBaja) {
        formBaja.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim().toLowerCase();
            let medicos = obtenerMedicos();

            const index = medicos.findIndex(medico => medico.nombre.toLowerCase() === nombre);

            if (index !== -1) {
                medicos.splice(index, 1);
                guardarMedicos(medicos);

                mensajeBaja.style.color = 'green';
                mensajeBaja.textContent = `Médico "${nombre}" dado de baja correctamente.`;
                formBaja.reset();

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            } else {
                mensajeBaja.style.color = 'red';
                mensajeBaja.textContent = 'No se encontró un médico con ese nombre.';
            }
        });
    }

    // ==========================
    // EDICIÓN DE MEDICOS
    // ==========================
    const formEditar = document.getElementById('form-editar');
    const mensajeEditar = document.getElementById('mensaje-editar');

    if (formEditar) {
        formEditar.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim().toLowerCase();
            const nuevaEspecialidad = document.getElementById('nueva-especialidad').value.trim();
            const nuevaObra = document.getElementById('nueva-obra').value.trim();

            let medicos = obtenerMedicos();
            const medico = medicos.find(m => m.nombre.toLowerCase() === nombre);

            if (medico) {
                if (nuevaEspecialidad) medico.especialidad = nuevaEspecialidad;
                if (nuevaObra) medico.obras = nuevaObra;

                guardarMedicos(medicos);
                mensajeEditar.style.color = 'green';
                mensajeEditar.textContent = `Datos actualizados correctamente.`;
                formEditar.reset();

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            } else {
                mensajeEditar.style.color = 'red';
                mensajeEditar.textContent = 'No se encontró un médico con ese nombre.';
            }
        });
    }

    // ==========================
    // CARGA DEL CATALOGO EN INDEX
    // ==========================
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        mostrarCatalogoMedicos();
    }

    function mostrarCatalogoMedicos() {
        const catalogo = document.getElementById('medicos-dinamicos');
        if (!catalogo) return;

        const medicos = obtenerMedicos();
        catalogo.innerHTML = '';

        medicos.forEach(medico => {
            const card = document.createElement('div');
            card.className = 'col-12 col-md-6 col-lg-4 d-flex';
            card.innerHTML = `
                <div class="card w-100 h-100">
                    <img src="${medico.img || 'img/sinfoto.jpg'}" width="200" height="200" style="object-fit: cover;" alt="Foto de ${medico.nombre}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${medico.nombre}</h5>
                        <p class="card-text">
                            Especialidad: ${medico.especialidad}<br>
                            Obra Social: ${medico.obras}<br>
                            Horarios: ${medico.horarios}<br>
                            Consultorio: ${medico.consultorio}<br>
                            Matricula: ${medico.matricula}
                        </p>
                        <div class="d-grid gap-2">
                            <a href="#" class="btn btn-primary">Solicitar Turno</a>
                        </div>
                    </div>
                </div>
            `;
            catalogo.appendChild(card);
        });
    }

});
