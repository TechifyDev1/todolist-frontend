import { TaskType } from "@/types/tasktype";
import { createContext, useContext } from "react";

type TaskContextType = {
    tasks: TaskType[];
    refetchTasks: () => void;
}

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    refetchTasks: () => {},
});
export { TaskContext };
const useTaskContext = () => {
    const context = useContext(TaskContext);
        return context;
}

export { useTaskContext };