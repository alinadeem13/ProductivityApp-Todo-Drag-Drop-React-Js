import userDarkMode from "./hooks/userDarkMode";

export default function App() {
  const [darkMode, setDarkMode] = userDarkMode();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white">Hello Tailwind v4 🚀</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900 transition-colors"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
