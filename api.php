<?php
// cabecera
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$tasksFile = 'task.json'; // fichero donde consumimos/guardamos datos

/** getTasks: El método  getTasks  verifica la existencia de un archivo, lee su contenido JSON y lo convierte en un array asociativo, devolviendo las tareas almacenadas.  */
function getTasks()
{
    global $tasksFile;
    if (file_exists($tasksFile)) {
        $tasks = json_decode(file_get_contents($tasksFile), true);
    } else {
        $tasks = [];
    }
    return $tasks;
}

/** saveTasks:  
 *- El método  saveTasks  toma un array de tareas como parámetro y utiliza una variable global  $tasksFile . 
 *- Guarda el contenido del array de tareas en el archivo definido en  $tasksFile  en formato JSON con formato legible. 
 *- Si la escritura falla, se registra un mensaje de error en el archivo de registro y se devuelve un mensaje de error en formato JSON. */
function saveTasks($tasks)
{
    global $tasksFile;
    $result = file_put_contents($tasksFile, json_encode($tasks, JSON_PRETTY_PRINT));
    if ($result === false) {
        error_log("Failed to write to $tasksFile"); // control de errores en log de php
        echo json_encode(['status' => 'error', 'message' => 'Failed to write to tasks file']);
    }
}

// Función para eliminar una tarea por ID
function deleteTask($taskId)
{
    global $tasksFile;
    $tasks = getTasks();

    foreach ($tasks as $key => $task) {
        if ($task['id'] == $taskId) {
            unset($tasks[$key]);
            break;
        }
    }

    $result = file_put_contents($tasksFile, json_encode($tasks, JSON_PRETTY_PRINT));
    if ($result === false) {
        error_log("Failed to write to $tasksFile");
        echo json_encode(['status' => 'error', 'message' => 'Failed to update tasks file']);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Task deleted successfully']);
    }
}

// Si es una petición GET..
if ($method == 'GET') {
    // Mostrar tareas
    //echo json_encode(getTasks());
    $tasks = getTasks();
    echo json_encode($tasks);
} elseif ($method == 'DELETE') { // si es eliminar
    //  Maneja la solicitud DELETE
    $taskId = $_GET['id']; // Obtenemos el ID de la tarea a eliminar desde la URL
    deleteTask($taskId);
} elseif ($method == 'POST') { // si es petición POST..
    // Agregar tarea
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica y agrega una nueva tarea a la lista de tareas, devolviendo un mensaje de éxito o error en formato JSON según la
    // validez de los datos.
    if (isset($data['title']) && isset($data['description'])) {
        $tasks = getTasks();
        $newTask = [
            'id' => count($tasks) + 1,
            'title' => $data['title'],
            'description' => $data['description']
        ];
        array_push($tasks, $newTask);
        saveTasks($tasks);
        echo json_encode(['status' => 'success', 'task' => $newTask]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    }
} else { // si hay error en las peticiones GET/POST.. mostramos el error
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
