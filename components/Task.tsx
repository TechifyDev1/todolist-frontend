"use client"
import { TaskType } from '@/types/tasktype';
import { TaskBaseUrl } from '@/utils/baseUrl';
import React from 'react'


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
        const baseUrl = "http://localhost:8080/tasks?userId=" + userId + "&taskId=" + task.id;
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
            console.log("Task updated successfully:", data);
            if (refetchTasks) {
                refetchTasks();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error updating task:", error.message);
            } else {
                console.error("Unexpected error:", error);
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
                console.log("Task deleted successfully:", data);
            } else {
                console.log("Task deleted successfully (no response body)");
            }

            if (refetchTasks) {
                refetchTasks();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting task:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <li className='bg-gray-800 p-4 rounded-lg flex justify-between items-center w-full' title={task.description}>
            <span className='text-white'>{task.title}</span>
            <div className="flex gap-3 items-center">
                <button className="text-green-400 text-2xl" onClick={handleComplete}>
                    ✓
                </button>
                <button className="text-red-500 text-2xl cursor-pointer" onClick={handleDelete}>
                    🗑
                </button>
            </div>
        </li>
    );
}

export default Task
