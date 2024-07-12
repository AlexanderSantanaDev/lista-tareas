import React, { useState } from "react";
import "./App.css";

function App() {
    /**************************************************************************************************************************************/
    //ESTADOS
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    /**************************************************************************************************************************************/
    //MÉTODOS
    /** addTask: 
        Crea una nueva tarea con un ID incrementado, la añade al array de tareas utilizando la sintaxis de propagación, y
        reinicia los campos de título y descripción. 
        Este método efectivamente agrega una nueva tarea a la lista existente, limpia los campos de entrada para título y 
        descripción, y actualiza el estado con la nueva tarea incluida.  */
    const addTask = () => {
        const newTask = { id: tasks.length + 1, title, description };
        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
    };

    /** deleteTask: Elimina una tarea específica del array de tareas utilizando el método  filter y comparando el ID de la tarea con el ID proporcionado.  */
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    /**************************************************************************************************************************************/
    // JSX
    return (
        <div className="pt-8 text-center">
            {/* Formulario para agregar nuevas tareas */}
            <div>
                <input
                    type="text"
                    className="peer block min-h-[auto] w-96 text-teal-500 rounded border-0 bg-gray-300 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-teal-500 motion-reduce:transition-none dark:text-teal-500 dark:peer-focus:text-teal-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de la tarea"
                />
                <textarea
                    value={description}
                    className="peer mt-4 block min-h-[auto] w-96 text-teal-500 rounded border-0 bg-gray-300 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-teal-500 motion-reduce:transition-none dark:text-teal-500 dark:peer-focus:text-teal-500"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                />
                <button
                    onClick={addTask}
                    className="inline-block mt-4 rounded bg-teal-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                    Agregar Tarea
                </button>
            </div>

            <h1 className="bg-gray-500 rounded-md mt-4 pl-2 pr-2">Lista de Tareas</h1>

            <ul>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex justify-between w-96 bg-teal-500 rounded-md h-10 mt-4 pl-2 pr-2 items-center"
                    >
                        {task.title}: {task.description}
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
