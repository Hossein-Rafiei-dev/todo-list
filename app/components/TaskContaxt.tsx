
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  deleted: boolean;
};

export type TaskView = "all" | "active" | "completed" | "trash";

type TaskContextType = {
  task: Task[];
  setTask: Dispatch<SetStateAction<Task[]>>;
  view: TaskView;
  setView: Dispatch<SetStateAction<TaskView>>;
};

const TaskContaxt = createContext<TaskContextType | undefined>(undefined);

type TaskContaxtProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "todo-tasks";

const TaskContaxtProvider = ({
  children,
}: TaskContaxtProviderProps) => {
  const [task, setTask] = useState<Task[]>([]);
  const [view, setView] = useState<TaskView>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved tasks when the app starts
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      if (savedTasks) {
        const parsedTasks: unknown = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTask(parsedTasks as Task[]);
        }
      }
    } catch (error) {
      console.error("Failed to load saved tasks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save tasks whenever the list changes
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [task, isLoaded]);

  return (
    <TaskContaxt.Provider
      value={{
        task,
        setTask,
        view,
        setView,
      }}
    >
      {children}
    </TaskContaxt.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContaxt);

  if (!context) {
    throw new Error(
      "useTaskContext must be used inside TaskContaxtProvider"
    );
  }

  return context;
};

export default TaskContaxtProvider;
