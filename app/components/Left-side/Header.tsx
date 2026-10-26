
"use client";

import { Check, Moon, Sun, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("todo-theme");
    const darkMode = savedTheme === "dark";

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("todo-theme", nextTheme ? "dark" : "light");
  };

  return (
    <header className="mb-5 flex flex-col gap-4 border-b border-slate-200/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
          <Check size={27} strokeWidth={2.5} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            ToDo List
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Small steps. Big progress.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-2 text-xs font-medium text-indigo-600 sm:flex">
          <Sparkles size={15} />
          Make today count
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
        >
          {isDark ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
