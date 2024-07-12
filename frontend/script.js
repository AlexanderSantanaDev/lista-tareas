$(document).ready(function () {
    /** loadTasks: 
        - Realiza una solicitud GET a la API de lista de tareas, recibe los datos y los muestra en una lista en el 
          elemento HTML con el id  taskList . 
        - Cada tarea en los datos se agrega como un elemento de lista ( <li> ) con un estilo específico que incluye el título y la 
          descripción de la tarea.Y algunas clases de tailwind css */
    function loadTasks() {
        // remplazar proyectos 'TU-RUTA-SERVIDOR-LOCAL'
        $.get("/proyectos/lista-tareas/api.php", function (data) {
            $("#taskList").empty();
            data.forEach(function (task) {
                $("#taskList").append(
                    '<li class="bg-teal-500 rounded-md mt-4 pl-2 pr-2">' +
                        task.title +
                        ": " +
                        task.description +
                        "</li>"
                );
            });
        });
    }

    // Función para eliminar una tarea
    function deleteTask(taskId) {
        $.ajax({
            type: "DELETE",
            url: `/proyectos/lista-tareas/api.php?id=${taskId}`, // remplazar proyectos 'TU-RUTA-SERVIDOR-LOCAL'
            success: function (response) {
                if (response.status === "success") {
                    loadTasks(); // Recargamos las tareas para mostrar la actualización
                } else {
                    alert(response.message); // Muestra un mensaje de error si algo sale mal
                }
            },
        });
    }

    // Evento para eliminar una tarea
    $(document).on("click", ".delete-task-btn", function () {
        var taskId = $(this).data("taskId");
        if (confirm("¿Estás seguro de querer eliminar esta tarea?")) {
            deleteTask(taskId);
        }
    });

    // Modificamos la función loadTasks para incluir un botón de eliminar en cada tarea
    function loadTasks() {
        // remplazar proyectos 'TU-RUTA-SERVIDOR-LOCAL'
        $.get("/proyectos/lista-tareas/api.php", function (data) {
            $("#taskList").empty();
            // Transforma el objeto en un array de tareas
            const tasksArray = Object.values(data);

            tasksArray.forEach(function (task) {
                $("#taskList").append(
                    `<li class="flex justify-between w-96 bg-teal-500 rounded-md h-10 mt-4 pl-2 pr-2 items-center">
                        <div>${task.title}: ${task.description}</div>
                        <button class="delete-task-btn btn-delete text-sm bg-red-600 rounded-md pl-2 pr-2" 
                        data-task-id="${task.id}">
                            Eliminar
                        </button>
                    </li>`
                );
            });
        });
    }

    // Captura el evento de envío del formulario  #taskForm , evita la acción predeterminada, obtiene los valores de título
    // y descripción, realiza una solicitud POST a la API con los datos en formato JSON y maneja la respuesta mostrando un
    // mensaje de éxito o error al agregar la tarea.
    $("#taskForm").on("submit", function (event) {
        event.preventDefault();
        const task = {
            title: $("#title").val(),
            description: $("#description").val(),
        };

        $.ajax({
            type: "POST",
            url: "/proyectos/lista-tareas/api.php",
            data: JSON.stringify(task),
            contentType: "application/json",
            success: function (response) {
                if (response.status === "success") {
                    loadTasks();
                    $("#title").val("");
                    $("#description").val("");
                } else {
                    alert("Error al agregar la tarea");
                }
            },
        });
    });

    // Al arrancar la aplicación, cargamos las tareas
    loadTasks();
});
