const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Array en memoria para almacenar las tareas
let tasks = [];

// Rutas de la API
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { ...req.body, id: tasks.length + 1 }; // Añadir ID único basado en el tamaño del array
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
