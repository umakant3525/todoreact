import React, { useState } from 'react';

function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setIsEditing(true);
    setTask(tasks[index]);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    if (task.trim() !== '') {
      const updatedTasks = tasks.map((t, index) =>
        index === currentTaskIndex ? task : t
      );
      setTasks(updatedTasks);
      setTask('');
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-l"
            placeholder="Add or update a task..."
          />
          <button
            onClick={isEditing ? updateTask : addTask}
            className={`${
              isEditing ? 'bg-green-500' : 'bg-blue-500'
            } text-white p-2 rounded-r hover:${
              isEditing ? 'bg-green-600' : 'bg-blue-600'
            }`}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-200 p-2 mb-2 rounded"
            >
              <span>{task}</span>
              <div>
                <button
                  onClick={() => editTask(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
