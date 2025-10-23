document.addEventListener('DOMContentLoaded', function () {
    // -------------------- ALTA DE MÉDICOS --------------------
    const formAlta = document.getElementById('form-alta');
    const mensajeAlta = document.getElementById('mensaje-alta');

    if (formAlta) {
        formAlta.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const especialidad = document.getElementById('especialidad').value.trim();
            const obras = document.getElementById('obras').value.trim();
            const horarios = document.getElementById('horarios').value.trim() || 'A confirmar';
            const consultorio = document.getElementById('consultorio').value.trim() || 'A asignar';
            const matricula = document.getElementById('matricula').value.trim() || 'En trámite';
            const descripcion = document.getElementById('descripcion').value.trim() || 'Información adicional próximamente.';
            const img = document.getElementById('img').value.trim() || 'img/medico.png';

            if (!nombre || !especialidad || !obras) {
                alert('Por favor completá todos los campos obligatorios.');
                return;
            }

            const nuevoMedico = {
                id: Date.now(), // identificador único
                nombre,
                especialidad,
                obras,
                horarios,
                consultorio,
                matricula,
                descripcion,
                img
            };

            const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
            medicos.push(nuevoMedico);
            localStorage.setItem('medicos', JSON.stringify(medicos));

            mensajeAlta.textContent = `Médico "${nombre}" registrado correctamente.`;
            formAlta.reset();

            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        });
    }

    // -------------------- BAJA DE MÉDICOS --------------------
    const formBaja = document.getElementById('form-baja');
    const mensajeBaja = document.getElementById('mensaje-baja');

    if (formBaja) {
        formBaja.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim().toLowerCase();
            let medicos = JSON.parse(localStorage.getItem('medicos')) || [];

            const index = medicos.findIndex(m => m.nombre.toLowerCase() === nombre);

            if (index !== -1) {
                medicos.splice(index, 1);
                localStorage.setItem('medicos', JSON.stringify(medicos));
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

    // -------------------- EDICIÓN DE MÉDICOS --------------------
    const formEditar = document.getElementById('form-editar');
    const mensajeEditar = document.getElementById('mensaje-editar');

    if (formEditar) {
        formEditar.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim().toLowerCase();
            const nuevaEspecialidad = document.getElementById('nueva-especialidad').value.trim();
            const nuevaObra = document.getElementById('nueva-obra').value.trim();

            let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
            const medico = medicos.find(m => m.nombre.toLowerCase() === nombre);

            if (medico) {
                if (nuevaEspecialidad) medico.especialidad = nuevaEspecialidad;
                if (nuevaObra) medico.obras = nuevaObra;

                localStorage.setItem('medicos', JSON.stringify(medicos));
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
});

