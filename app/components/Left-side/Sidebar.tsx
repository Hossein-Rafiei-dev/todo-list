
"use client";

import {
  Home,
  Clock,
  CircleCheck,
  Trash2,
  Sparkles,
} from "lucide-react";

import { useTaskContext, type TaskView } from "../TaskContaxt";

const Sidebar = () => {
  const { task, view, setView } = useTaskContext();

  const counts: Record<TaskView, number> = {
    all: task.filter((item) => !item.deleted).length,
    active: task.filter((item) => !item.deleted && !item.completed).length,
    completed: task.filter((item) => !item.deleted && item.completed).length,
    trash: task.filter((item) => item.deleted).length,
  };

  const menuItems: {
    label: string;
    view: TaskView;
    icon: typeof Home;
  }[] = [
    { label: "All Tasks", view: "all", icon: Home },
    { label: "In Progress", view: "active", icon: Clock },
    { label: "Completed", view: "completed", icon: CircleCheck },
    { label: "Trash", view: "trash", icon: Trash2 },
  ];

  return (
    <aside className="flex h-full min-h-[320px] w-full min-w-0 flex-col rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/75 sm:p-5">
      {/* Sidebar heading */}
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={17} className="text-indigo-500 dark:text-violet-400" />

          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Workspace
          </h2>
        </div>

        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          Keep everything organized in one place.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2" aria-label="Task filters">
        <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          MENU
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.view;

          return (
            <button
              key={item.view}
              type="button"
              onClick={() => setView(item.view)}
              aria-current={isActive ? "page" : undefined}
              className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-500/15 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "shrink-0 text-indigo-600 dark:text-indigo-300"
                      : "shrink-0 text-slate-400 transition-colors group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-300"
                  }
                />

                <span className="truncate font-medium">{item.label}</span>
              </span>

              <span
                className={`min-w-7 rounded-lg px-2 py-1 text-center text-xs font-semibold tabular-nums ${
                  isActive
                    ? "bg-white text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-200"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {counts[item.view]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Motivation card */}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 dark:border-indigo-400/15 dark:from-indigo-500/10 dark:to-violet-500/10">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-violet-300">
            <Sparkles size={18} />
          </div>

          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            One step at a time
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Every small task you finish is progress worth celebrating.
          </p>
        </div>

        <p className="mt-4 text-center text-[10px] text-slate-400 dark:text-slate-500">
          STAY FOCUSED · KEEP GROWING
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
