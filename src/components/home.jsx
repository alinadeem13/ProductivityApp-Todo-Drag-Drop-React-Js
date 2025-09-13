import React, { useState } from "react";
import { useDarkMode } from "../hooks/userDarkMode";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  toggleTask,
  deleteTask,
  updateTask,
  reorderTasks,
} from "../features/tasks/taskSlice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "react-toastify";

const Home = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const { items } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    if (!isNaN(newTask)) {
      toast.error("Please enter a valid task.");
      setNewTask("");
    } else {
      toast.success(`Task Added: ${newTask}`);
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(
      reorderTasks({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(items[index].id));
    toast.success("Task Deleted");
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditValue(items[index].text);
  };

  const handleSaveTask = (index) => {
    if (editValue.trim() !== "") {
      dispatch(updateTask({ id: items[index].id, text: editValue }));
    }
    setEditIndex(null);
    setEditValue("");
  };

  const handleToggleDone = (index) => {
    dispatch(toggleTask(items[index].id));
  };

  return (
    <div
      className={`flex flex-col items-center justify-start min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl gap-4 mb-6">
        <h1
          className={`text-2xl sm:text-3xl font-bold transition-colors duration-300
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

      <p className="text-center sm:text-left mb-6">
        {darkMode ? "text-gray-300" : "text-gray-700"}
        Welcome to your productivity app! Toggle the theme to suit your mood.
      </p>

      {/* Add Task */}
      <div
        className={`w-full max-w-xl mt-4 p-4 sm:p-6 rounded-xl shadow-lg border transition-colors duration-300
        ${
          darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Enter a new task..."
            className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="w-full max-w-xl mt-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {items.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg shadow transition-colors duration-300
                        ${
                          darkMode
                            ? "bg-gray-700 border border-gray-600 text-white"
                            : "bg-gray-100 border border-gray-300 text-gray-900"
                        }`}
                      >
                        {/* Task Text */}
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className={`flex-1 px-2 py-1 mb-2 sm:mb-0 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${
                              darkMode
                                ? "bg-gray-600 text-white border-gray-500"
                                : "bg-white text-gray-900 border-gray-300"
                            }`}
                          />
                        ) : (
                          <span
                            className={`flex-1 break-words ${
                              task.completed ? "line-through opacity-60" : ""
                            }`}
                          >
                            <span className="font-bold mr-2">{index + 1}.</span>
                            {task.text}
                          </span>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
