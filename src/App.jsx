import React from 'react';
import TaskList from './TaskList';
import './styles.css';

const App = () => {
  return (
    <div className="task-management">
      <h1>Task Management</h1>
      <TaskList tasks={[]} />
    </div>
  );
};

export default App;