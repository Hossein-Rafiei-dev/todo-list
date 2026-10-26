
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  RotateCcw,
  X,
  Check,
  ListTodo,
  CircleCheck,
  Clock,
  ArchiveRestore,
  Inbox,
} from "lucide-react";

import { useTaskContext } from "../TaskContaxt";

const AddTask = () => {
  const { task, setTask, view } = useTaskContext();

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const pageInfo = {
    all: {
      title: "My Tasks",
      description: "Organize your day, one task at a time.",
      emptyTitle: "Your task list is empty",
      emptyDescription: "Add your first task and get things moving.",
    },
    active: {
      title: "In Progress",
      description: "Focus on what still needs to get done.",
      emptyTitle: "All caught up!",
      emptyDescription: "There are no active tasks right now.",
    },
    completed: {
      title: "Completed Tasks",
      description: "Look at everything you've accomplished.",
      emptyTitle: "Nothing completed yet",
      emptyDescription: "Finish a task and it will appear here.",
    },
    trash: {
      title: "Trash",
      description: "Restore tasks or permanently remove them.",
      emptyTitle: "Trash is empty",
      emptyDescription: "Deleted tasks will appear here.",
    },
  }[view];

  const visibleTasks = useMemo(() => {
    return task
      .filter((item) => {
        if (view === "trash") return item.deleted;
        if (item.deleted) return false;

        if (view === "active") return !item.completed;
        if (view === "completed") return item.completed;

        return true;
      })
      .filter((item) =>
        item.title.toLowerCase().includes(search.trim().toLowerCase())
      );
  }, [task, view, search]);

  const activeCount = task.filter(
    (item) => !item.deleted && !item.completed
  ).length;

  const completedCount = task.filter(
    (item) => !item.deleted && item.completed
  ).length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    if (editingId) {
      setTask((previous) =>
        previous.map((item) =>
          item.id === editingId && !item.deleted
            ? { ...item, title: trimmedTitle }
            : item
        )
      );

      setEditingId(null);
      setTitle("");
      return;
    }

    setTask((previous) => [
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false,
        deleted: false,
      },
      ...previous,
    ]);

    setTitle("");
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setTitle(currentTitle);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
  };

  const toggleCompleted = (id: string) => {
    setTask((previous) =>
      previous.map((item) =>
        item.id === id && !item.deleted
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const moveToTrash = (id: string) => {
    setTask((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, deleted: true } : item
      )
    );

    if (editingId === id) cancelEdit();
  };

  const restoreTask = (id: string) => {
    setTask((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, deleted: false } : item
      )
    );
  };

  const permanentlyDelete = (id: string) => {
    setTask((previous) => previous.filter((item) => item.id !== id));

    if (editingId === id) cancelEdit();
  };

  const emptyTrash = () => {
    setTask((previous) => previous.filter((item) => !item.deleted));
  };

  return (
    <section className="flex h-full min-h-[420px] w-full min-w-0 flex-col rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/75 sm:p-5 lg:p-6">
      {/* Heading */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              {view === "all" && <ListTodo size={19} />}
              {view === "active" && <Clock size={19} />}
              {view === "completed" && <CircleCheck size={19} />}
              {view === "trash" && <Trash2 size={19} />}
            </div>

            <h2 className="truncate text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-2xl">
              {pageInfo.title}
            </h2>
          </div>

          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {pageInfo.description}
          </p>
        </div>

        {view === "trash" && (
          <button
            type="button"
            onClick={emptyTrash}
            disabled={!task.some((item) => item.deleted)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
          >
            <Trash2 size={15} />
            Empty trash
          </button>
        )}
      </div>

      {/* Progress summary */}
      {view !== "trash" && (
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-slate-800/60 sm:p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock size={15} className="text-amber-500" />
              In progress
            </div>

            <p className="text-2xl font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-slate-800/60 sm:p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CircleCheck size={15} className="text-emerald-500" />
              Completed
            </div>

            <p className="text-2xl font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {completedCount}
            </p>
          </div>
        </div>
      )}

      {/* Add or edit task */}
      {view !== "trash" && (
        <form onSubmit={handleSubmit} className="mb-5">
          <label
            htmlFor="task-title"
            className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            {editingId ? "Edit your task" : "Add a new task"}
          </label>

          <div className="flex min-w-0 items-center gap-2">
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What do you need to do?"
              className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200/80 bg-white/80 px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 sm:px-4"
            />

            <button
              type="submit"
              disabled={!title.trim()}
              aria-label={editingId ? "Save task" : "Add task"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {editingId ? <Check size={19} /> : <Plus size={21} />}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                aria-label="Cancel editing"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="h-11 w-full rounded-xl border border-slate-200/70 bg-slate-50/80 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
        />
      </div>

      {/* Task list heading */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {view === "trash" ? "Deleted items" : "Your list"}
        </h3>

        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {visibleTasks.length} {visibleTasks.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex flex-1 flex-col gap-2">
        {visibleTasks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-10 text-center dark:border-white/10 dark:bg-slate-800/30">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
              <Inbox size={25} />
            </div>

            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {pageInfo.emptyTitle}
            </h3>

            <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
              {search.trim()
                ? "Try another search term."
                : pageInfo.emptyDescription}
            </p>
          </div>
        ) : (
          visibleTasks.map((item) => (
            <article
              key={item.id}
              className="group flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/70 bg-white/80 p-3 transition-all duration-200 hover:border-indigo-200 hover:shadow-sm dark:border-white/10 dark:bg-slate-800/60 dark:hover:border-indigo-400/30 dark:hover:bg-slate-800/90 sm:p-4"
            >
              {view !== "trash" ? (
                <button
                  type="button"
                  onClick={() => toggleCompleted(item.id)}
                  aria-label={
                    item.completed
                      ? "Mark task as incomplete"
                      : "Mark task as completed"
                  }
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    item.completed
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-300 bg-white text-transparent hover:border-indigo-400 dark:border-slate-600 dark:bg-slate-900"
                  }`}
                >
                  {item.completed && <Check size={13} strokeWidth={3} />}
                </button>
              ) : (
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-rose-400">
                  <Trash2 size={17} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p
                  className={`break-words text-sm font-medium leading-6 ${
                    item.completed && view !== "trash"
                      ? "text-slate-400 line-through dark:text-slate-500"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {item.title}
                </p>

                <span
                  className={`mt-1 inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${
                    view === "trash"
                      ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
                      : item.completed
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                  }`}
                >
                  {view === "trash"
                    ? "Deleted"
                    : item.completed
                      ? "Completed"
                      : "In progress"}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {view === "trash" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => restoreTask(item.id)}
                      aria-label="Restore task"
                      title="Restore task"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                    >
                      <RotateCcw size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => permanentlyDelete(item.id)}
                      aria-label="Delete permanently"
                      title="Delete permanently"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    {!item.completed && (
                      <button
                        type="button"
                        onClick={() => handleEdit(item.id, item.title)}
                        aria-label="Edit task"
                        title="Edit task"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                      >
                        <Pencil size={15} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => moveToTrash(item.id)}
                      aria-label="Move task to trash"
                      title="Move to trash"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {/* Footer */}
      {view !== "trash" && (
        <div className="mt-5 flex items-center gap-2 border-t border-slate-200/70 pt-4 text-xs text-slate-400 dark:border-white/10 dark:text-slate-500">
          <ArchiveRestore size={14} />
          <span>Small progress is still progress.</span>
        </div>
      )}
    </section>
  );
};

export default AddTask;
