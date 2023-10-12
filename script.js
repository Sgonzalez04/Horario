let horario = [];

// Función para agregar un horario
function add_horario() {
    // Guarda la persona como un conjunto de nombre y días
    let persona = {
        nombre: document.getElementById("nombre").value,
        lunes: {
            inicio: document.getElementById("lunes-inicio").value,
            fin: document.getElementById("lunes-fin").value
        },
        martes: {
            inicio: document.getElementById("martes-inicio").value,
            fin: document.getElementById("martes-fin").value
        },
        miercoles: {
            inicio: document.getElementById("miercoles-inicio").value,
            fin: document.getElementById("miercoles-fin").value
        },
        jueves: {
            inicio: document.getElementById("jueves-inicio").value,
            fin: document.getElementById("jueves-fin").value
        },
        viernes: {
            inicio: document.getElementById("viernes-inicio").value,
            fin: document.getElementById("viernes-fin").value
        }
    };

    // Validación para campos vacíos
    if (persona.nombre === "" || persona.lunes.inicio === "" || persona.lunes.fin === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return; // Evita agregar si hay campos vacíos.
    }

    horario.push(persona); // Añade al final de la lista a la persona
    localStorage.setItem("horarios_campus", JSON.stringify(horario)); // Guarda el resultado en formato JSON
    load_horarios(); // Actualiza la lista de horarios después de agregar.
    clearFields(); // Limpia los campos después de agregar una persona al horario.
}

// Función para cargar los horarios
function load_horarios() {
    horario = JSON.parse(localStorage.getItem("horarios_campus")) || [];

    let container = document.querySelector(".contain_horarios"); // Selecciona el contenedor de horarios
    container.innerHTML = ""; // Cambiado de textContent a innerHTML para agregar contenido HTML.

    // Itera a través de la lista de horarios y crea elementos para mostrar cada horario.
    for (let x = 0; x < horario.length; x++) {
        // Crea un nuevo elemento <div> para cada horario.
        let div_horario = document.createElement("div");
        div_horario.classList.add("horario"); // Asigna la clase "horario" al <div>.

        // Crea un elemento <p> para mostrar la información de la persona.
        let p = document.createElement("p");
        p.innerHTML = `<b>Nombre:</b> ${horario[x].nombre}<br>` +
            `<b>Lunes:</b> Inicio: ${horario[x].lunes.inicio} - Fin:${horario[x].lunes.fin}<br>` +
            `<b>Martes:</b> Inicio: ${horario[x].martes.inicio} - Fin: ${horario[x].martes.fin}<br>` +
            `<b>Miércoles:</b> Inicio: ${horario[x].miercoles.inicio} - Fin: ${horario[x].miercoles.fin}<br>` +
            `<b>Jueves:</b> Inicio: ${horario[x].jueves.inicio} - Fin: ${horario[x].jueves.fin}<br>` +
            `<b>Viernes:</b> Inicio: ${horario[x].viernes.inicio} - Fin: ${horario[x].viernes.fin}<br>`;

        // Crea un botón de "Eliminar" para permitir la eliminación de la persona del horario.
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = function() {
            delete_horario(this);
        };

        // Agrega el elemento <p> que muestra la información y el botón "Eliminar" al <div>.
        div_horario.appendChild(p);
        div_horario.appendChild(deleteButton);

        // Agrega el <div> que contiene la información y el botón al contenedor general.
        container.appendChild(div_horario);
    }
}

// Función para eliminar un horario
function delete_horario(button) {
    let horarioContainer = button.parentElement;
    let horarioName = horarioContainer.querySelector("p").textContent;

    if (confirm(`¿Estás seguro de que deseas eliminar el estudiante "${horarioName}"?`)) {
        let index = Array.from(horarioContainer.parentElement.children).indexOf(horarioContainer);
        horario.splice(index, 1);
        localStorage.setItem("horarios_campus", JSON.stringify(horario));
        horarioContainer.remove();
    }
}

// Función para limpiar los campos después de agregar una persona al horario
function clearFields() {
    document.querySelectorAll(".info_book input").forEach((input) => {
        input.value = "";
    });
}

// Llama a load_horarios en la carga inicial de la página
window.addEventListener("load", load_horarios);
