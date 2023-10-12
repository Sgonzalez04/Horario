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

        // Crea un botón de "Editar" para permitir la edición del horario.
        let editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = function() {
            edit_horario(x);
        };

        // Crea un botón de "Eliminar" para permitir la eliminación de la persona del horario.
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = function() {
            delete_horario(this);
        };

        // Agrega el elemento <p> que muestra la información y los botones "Editar" y "Eliminar" al <div>.
        div_horario.appendChild(p);
        div_horario.appendChild(editButton);
        div_horario.appendChild(deleteButton);

        // Agrega el <div> que contiene la información y los botones al contenedor general.
        container.appendChild(div_horario);
    }
}

// Función para editar un horario existente
function edit_horario(index) {
    // Obtener el horario que se va a editar
    let horarioToEdit = horario[index];

    // Llenar los campos de entrada con la información del horario existente
    document.getElementById("nombre").value = horarioToEdit.nombre;
    document.getElementById("lunes-inicio").value = horarioToEdit.lunes.inicio;
    document.getElementById("lunes-fin").value = horarioToEdit.lunes.fin;
    document.getElementById("martes-inicio").value = horarioToEdit.martes.inicio;
    document.getElementById("martes-fin").value = horarioToEdit.martes.fin;
    document.getElementById("miercoles-inicio").value = horarioToEdit.miercoles.inicio;
    document.getElementById("miercoles-fin").value = horarioToEdit.miercoles.fin;
    document.getElementById("jueves-inicio").value = horarioToEdit.jueves.inicio;
    document.getElementById("jueves-fin").value = horarioToEdit.jueves.fin;
    document.getElementById("viernes-inicio").value = horarioToEdit.viernes.inicio;
    document.getElementById("viernes-fin").value = horarioToEdit.viernes.fin;

    // Eliminar el horario original
    horario.splice(index, 1);
    localStorage.setItem("horarios_campus", JSON.stringify(horario));
    load_horarios(); // Actualizar la lista de horarios después de la edición.

    // Cambiar la función del botón "Agregar" para que guarde los cambios
    let addButton = document.querySelector("button[onclick='add_horario()']");
    addButton.textContent = "Guardar Cambios";
    addButton.onclick = function () {
        save_changes(index);
    };
}

// Función para guardar los cambios en un horario editado
function save_changes(index) {
    // Crear un nuevo objeto de horario con los datos editados
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

    // Insertar el horario editado en la posición original
    horario.splice(index, 0, persona);
    localStorage.setItem("horarios_campus", JSON.stringify(horario));
    load_horarios(); // Actualizar la lista de horarios después de la edición.
    clearFields(); // Limpia los campos después de guardar los cambios.

    // Restaurar la función del botón "Agregar" para agregar nuevos horarios
    let addButton = document.querySelector("button[onclick='save_changes()']");
    addButton.textContent = "Agregar";
    addButton.onclick = add_horario;
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
