import React, { useState } from "react";
import { useDarkMode } from "../hooks/userDarkMode";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  toggleTask,
  deleteTask,
  updateTask,
} from "../features/tasks/taskSlice";

const Home = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    if (!isNaN(newTask)) {
      alert("Please enter a valid task.");
      setNewTask("");
    } else {
      alert(`Task Added: ${newTask}`);
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  // Delete task
  const handleDeleteTask = (index) => {
    dispatch(deleteTask(tasks[index].id));
    alert("Task Deleted");
  };

  // Edit task
  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  // Save edited task
  const handleSaveTask = (index) => {
    if (editValue.trim() !== "") {
      dispatch(updateTask({ id: tasks[index].id, text: editValue }));
    }
    setEditIndex(null);
    setEditValue("");
  };

  // Toggle done/undo
  const handleToggleDone = (index) => {
    dispatch(toggleTask(tasks[index].id));
  };

  console.log("ITEEMSS", tasks);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <h1
          className={`text-3xl font-bold transition-colors duration-300
          ${darkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          🚀 Productivity App
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300
          ${
            darkMode
              ? "bg-blue-400 text-gray-900 hover:bg-blue-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
        Welcome to your productivity app! Toggle the theme to suit your mood.
      </p>

      {/* Add Task */}
      <div
        className={`mt-8 p-6 w-96 rounded-xl shadow-lg border transition-colors duration-300
        ${
          darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <div className="flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
            placeholder="Enter a new task..."
            className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />
          <button
            className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-8 w-96">
        <ul>
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`flex justify-between items-center mt-4 p-3 rounded-lg shadow transition-colors duration-300
              ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-900"
              }`}
            >
              {/* If editing */}
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={`flex-1 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    darkMode
                      ? "bg-gray-600 text-white border-gray-500"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                />
              ) : (
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  <span className="font-bold mr-2">{index + 1}.</span>
                  {task.text}
                </span>
              )}

              {/* Buttons */}
              <div className="flex gap-2">
                {editIndex === index ? (
                  <button
                    onClick={() => handleSaveTask(index)}
                    className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(index)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    ✏️
                  </button>
                )}

                <button
                  onClick={() => handleToggleDone(index)}
                  className="px-2 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => handleDeleteTask(index)}
                  className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-600 transition"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
