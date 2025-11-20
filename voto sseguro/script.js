// script.js - LÓGICA PRINCIPAL DEL SISTEMA DE VOTACIÓN

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. Lógica en la página de Candidatos (candidatos.html)
    // ----------------------------------------------------------------
    const candidatosForm = document.querySelector('.candidatos-form');
    const candidatoCards = document.querySelectorAll('.candidato-card');

    if (candidatosForm) {
        candidatoCards.forEach(card => {
            const radioInput = card.querySelector('input[type="radio"]');

            // Lógica para seleccionar/deseleccionar la tarjeta al hacer clic en cualquier parte
            card.addEventListener('click', (event) => {
                // Previene que el click en el radio active dos eventos
                if (event.target === radioInput) return;
                
                radioInput.checked = true;
                actualizarSeleccion();
            });

            radioInput.addEventListener('change', actualizarSeleccion);
        });

        function actualizarSeleccion() {
            candidatoCards.forEach(card => {
                const radioInput = card.querySelector('input[type="radio"]');
                card.classList.remove('marcado');
                if (radioInput.checked) {
                    card.classList.add('marcado');
                }
            });
        }

        // Manejar el envío del formulario (al presionar VOTAR)
        candidatosForm.addEventListener('submit', (e) => {
            const votoSeleccionado = document.querySelector('input[name="voto_candidato"]:checked');
            
            if (votoSeleccionado) {
                // Almacenar el voto en el almacenamiento local para usarlo en la página 'finalizado.html'
                const candidatoNombre = votoSeleccionado.parentNode.querySelector('.nombre').textContent;
                
                // Generar un código de auditoría simple
                const codigoAuditoria = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                                       '-' + Math.random().toString(36).substring(2, 6).toUpperCase() +
                                       '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

                localStorage.setItem('votoCandidato', candidatoNombre);
                localStorage.setItem('codigoAuditoria', codigoAuditoria);
            }
        });
    }

    // ----------------------------------------------------------------
    // 2. Lógica en la página de Voto Finalizado (finalizado.html)
    // ----------------------------------------------------------------
    const candidatoVotoId = document.getElementById('candidato-voto-id');
    const codigoAuditoriaSpan = document.querySelector('.codigo-auditoria');

    if (candidatoVotoId && codigoAuditoriaSpan) {
        const voto = localStorage.getItem('votoCandidato');
        const codigo = localStorage.getItem('codigoAuditoria');

        if (voto) {
            candidatoVotoId.textContent = voto;
        }
        if (codigo) {
            codigoAuditoriaSpan.textContent = codigo;
        } else {
            codigoAuditoriaSpan.textContent = 'ERROR-CODE-001';
        }
    }


    // ----------------------------------------------------------------
    // 3. Lógica en la página de Soporte (soporte.html)
    // ----------------------------------------------------------------
    const botonBuscar = document.querySelector('.boton-buscar');
    const inputCodigo = document.querySelector('.input-codigo');
    const resultadoVerificacion = document.getElementById('resultado-verificacion');

    if (botonBuscar) {
        botonBuscar.addEventListener('click', () => {
            const codigoIngresado = inputCodigo.value.trim().toUpperCase();
            const codigoGuardado = localStorage.getItem('codigoAuditoria');
            
            resultadoVerificacion.classList.remove('resultado-vacio', 'resultado-exito', 'resultado-error');

            if (codigoIngresado === '') {
                resultadoVerificacion.textContent = 'Por favor, ingrese un código de auditoría.';
                resultadoVerificacion.classList.add('resultado-error');
                return;
            }

            // Simulación de auditoría (el código guardado es el único voto "válido")
            if (codigoIngresado === codigoGuardado && codigoGuardado !== null) {
                resultadoVerificacion.textContent = '✅ Voto Encontrado y Verificado: Su voto fue incluido en el registro público.';
                resultadoVerificacion.classList.add('resultado-exito');
            } else {
                resultadoVerificacion.textContent = '❌ Código no encontrado: El código ingresado no coincide con ningún voto registrado o el código es inválido.';
                resultadoVerificacion.classList.add('resultado-error');
            }
        });
    }

    // ----------------------------------------------------------------
    // 4. Añadir Estilos para resultados de auditoría (necesario para el JS)
    // ----------------------------------------------------------------
    // (Generalmente esto va en styles.css, pero lo añadimos por si acaso)
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .resultado-exito {
            text-align: center;
            padding: 20px;
            margin-top: 20px;
            border: 1px solid #2ecc71;
            background-color: #e6ffe6;
            border-radius: 5px;
            color: #2ecc71;
            font-weight: bold;
        }
        .resultado-error {
            text-align: center;
            padding: 20px;
            margin-top: 20px;
            border: 1px solid #e74c3c;
            background-color: #ffe6e6;
            border-radius: 5px;
            color: #e74c3c;
            font-weight: bold;
        }
    `;
    document.head.appendChild(styleTag);
});