"use client";
import React, { FormEvent, useState } from 'react'
import Task from './Task'
import { useTaskContext } from '@/contexts/TaskContext'
import { TaskType } from '@/types/tasktype';
import { TaskBaseUrl } from '@/utils/baseUrl';



// interface MainSectionProps {
//     tasks: TaskType[];
// }

const MainSection = () => {
    // const taskContext = useTaskContext();
    // const tasks = taskContext?.tasks ?? [];
    // const refetchTasks = taskContext?.refetchTasks;
    const { tasks, refetchTasks } = useTaskContext();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = localStorage.getItem("userid");
        if (!userId) {
            window.location.href = "/sign-up";
            return;
        }
        if (!taskTitle.trim()) {
            alert("Task title cannot be empty");
            return;
        }
        const baseUrl = TaskBaseUrl + "/create?userId=" + userId;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: taskTitle,
                userId: userId,
                completed: false,
                description: taskDescription
            })
        }
        try {
            const res = await fetch(baseUrl, requestOptions);
            if (!res.ok) {
                throw new Error("Failed to create task");
            }
            const data = await res.json();
            console.log("Task created successfully:", data);
            setTaskTitle('');
            setTaskDescription('');
            if (refetchTasks) {
                refetchTasks();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error creating task:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    console.log(tasks)
    return (
        <main className="flex flex-col items-center w-full h-full mt-30" onSubmit={handleSubmit}>
            <form action="" className="flex flex-col gap-4 mt-6">
                <input
                    type="text"
                    name="task"
                    id="task"
                    placeholder="What needs to be done..."
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />

                <textarea
                    name="description"
                    id="description"
                    placeholder="Add some details (optional)"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none min-h-[100px]"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all self-end"
                >
                    Submit
                </button>
            </form>

            <ul className='mt-6 space-y-3 w-full max-w-md px-4'>
                {tasks.length === 0 ? (
                    <li className="text-gray-400 text-center">No tasks found.</li>
                ) : (
                    console.log(tasks),
                    tasks.map((task: TaskType, idx: number) => <Task key={idx} task={task} refetchTasks={refetchTasks} />)
                )}
            </ul>
        </main>
    )
}

export default MainSection
