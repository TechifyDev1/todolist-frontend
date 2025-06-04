"use client"
import { TaskType } from '@/types/tasktype';
import { TaskBaseUrl } from '@/utils/baseUrl';
import React from 'react'
import { toast } from 'sonner';


interface TaskProps {
    task: TaskType;
    refetchTasks: (() => void) | undefined;
}

const Task: React.FC<TaskProps> = ({ task, refetchTasks }) => {
    const handleComplete: () => void = async () => {
        const userId = localStorage.getItem("userid");
        if (!userId) {
            window.location.href = "/sign-up";
        }
        const baseUrl = `${TaskBaseUrl}/complete?userId=${userId}&taskId=${task.id}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: !task.completed,
                id: task.id
            })
        }
        try {
            const res = await fetch(baseUrl, requestOptions);
            if (!res.ok) {
                throw new Error("Failed to update task");
            }
            const data = await res.json();
            // console.log("Task updated successfully:", data);
            if (refetchTasks) {
                refetchTasks();
            }
            toast.success(
                task.completed
                    ? "Task marked as incomplete successfully"
                    : "Task marked as complete successfully"
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error updating task:", error.message);
                toast.error(`Error updating task: ${error.message}`);
            } else {
                console.error("Unexpected error:", error);
                toast.error("Unexpected error occurred while updating task");
            }
        }

    }
    const handleDelete = async () => {
        const userId = localStorage.getItem("userid");
        if (!userId) {
            window.location.href = "/sign-up";
            return;
        }

        const baseUrl = `${TaskBaseUrl}?userId=${userId}&taskId=${task.id}`;
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await fetch(baseUrl, requestOptions);

            if (!res.ok) {
                throw new Error("Failed to delete task");
            }

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                // console.log("Task deleted successfully:", data);
                toast.success("Task deleted successfully");
            } else {
                console.log("Task deleted successfully (no response body)");
                toast.success("Task deleted successfully");
            }

            if (refetchTasks) {
                refetchTasks();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting task:", error.message);
                toast.error(`Error deleting task: ${error.message}`);
            } else {
                console.error("Unexpected error:", error);
                toast.error("Unexpected error occurred while deleting task");
            }
        }
    };

    return (
        <li
            className="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
            title={task.description}
        >
            <span
                className={`text-base transition-colors ${task.completed ? "line-through text-gray-400" : "text-white"
                    }`}
            >
                {task.title}
            </span>

            <div className="flex gap-2">
                <button
                    onClick={handleComplete}
                    className="text-green-500 hover:text-green-400 transition"
                    aria-label="Mark as complete"
                >
                    ✓
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-400 transition"
                    aria-label="Delete task"
                >
                    🗑
                </button>
            </div>
        </li>
    );
}

export default Task
