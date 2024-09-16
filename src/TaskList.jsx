import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

// URL de la API donde se gestionan las tareas
const API_URL = 'http://localhost:5000/api/tasks'; // Ajusta el puerto si es necesario

/**
 * Componente principal para la lista de tareas.
 */
function TaskList() {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);
  // Estado para manejar la nueva tarea a agregar
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    fecha: '',
    completed: false
  });
  // Estado para manejar el filtro de tareas (todas, completadas, pendientes)
  const [filter, setFilter] = useState('all');
  // Estado para manejar mensajes de error de entrada
  const [errorInput, setErrorInput] = useState(null);

  // Efecto para cargar las tareas desde la API o localStorage al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        const tasksFromServer = response.data;
        setTasks(tasksFromServer);
        localStorage.setItem('tasks', JSON.stringify(tasksFromServer));
      } catch (error) {
        console.error('Error fetching tasks:', error);
        const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(tasksFromStorage);
      }
    };

    fetchTasks();
  }, []);

  /**
   * Maneja el cambio en los campos de entrada del formulario.
   * @param {Object} event - El evento del cambio de entrada.
   */
  const handleInputChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value
    });
  };

  /**
   * Maneja el envío del formulario para agregar una nueva tarea.
   * @param {Object} event - El evento del envío del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newTask.name) {
      setErrorInput('Por favor, ingresa un nombre para la tarea');
    } else if (!newTask.fecha) {
      setErrorInput('Por favor, ingresa una fecha para la tarea');
    } else {
      try {
        const response = await axios.post(API_URL, newTask);
        const addedTask = response.data;
        const updatedTasks = [...tasks, addedTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setNewTask({
          name: '',
          description: '',
          fecha: '',
          completed: false
        });
        setErrorInput(null);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  /**
   * Maneja el cambio del estado de completado de una tarea.
   * @param {number} id - El ID de la tarea que se va a actualizar.
   */
  const handleToggleCompleted = async (id) => {
    try {
      const task = tasks.find(task => task.id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`${API_URL}/${id}`, updatedTask);
      const updatedTasks = tasks.map(task =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  /**
   * Maneja la eliminación de una tarea.
   * @param {number} id - El ID de la tarea que se va a eliminar.
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  /**
   * Maneja el cambio del filtro de tareas.
   * @param {Object} event - El evento del cambio de selección.
   */
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtrar las tareas según el filtro seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all' muestra todas las tareas
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Nueva Tarea</h2>
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={newTask.fecha}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        {errorInput && <p style={{ color: 'red' }}>{errorInput}</p>}
        <button type="submit">Agregar Tarea</button>
      </form>

      {/* Filtros */}
      <div>
        <label>Mostrar: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
        <h1>Lista de Tareas</h1>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleCompleted={() => handleToggleCompleted(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * Componente para representar una tarea individual.
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.task - La tarea a representar.
 * @param {Function} props.onToggleCompleted - Función para manejar el cambio de estado de completado.
 * @param {Function} props.onDelete - Función para manejar la eliminación de la tarea.
 */
function Task({ task, onToggleCompleted, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <button className="delete-button" onClick={onDelete}>✖</button>
        <p style={{ color: task.completed ? '#00ff2a' : 'white' }}>
          Nombre: {task.name}
        </p>
      </div>
      <p style={{ color: task.completed ? '#00ff2a' : 'white' }}>
        Descripción: {task.description}
      </p>
      <p style={{ color: task.completed ? '#00ff2a' : 'white' }}>
        Fecha: {task.fecha}
      </p>
      <button className="complete-button" onClick={onToggleCompleted}>
        {task.completed ? 'Desmarcar' : 'Marcar como completada'}
      </button>
    </li>
  );
}

export default TaskList;
