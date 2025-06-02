import { TaskType } from "@/types/tasktype";
import { createContext, useContext } from "react";

type TaskContextType = {
    tasks: TaskType[];
    refetchTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
export { TaskContext };
const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
        return context;
    }
}

export { useTaskContext };