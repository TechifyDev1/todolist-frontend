import React from 'react'
import Task from './Task'
import { useTaskContext } from '@/contexts/TaskContext'
import { TaskType } from '@/types/tasktype';



// interface MainSectionProps {
//     tasks: TaskType[];
// }

const MainSection = () => {
    const taskContext = useTaskContext();
    const tasks = taskContext?.tasks ?? [];
    const refetchTasks = taskContext?.refetchTasks;
    return (
        <main className="flex flex-col items-center w-full h-full mt-16">
            <form action="" className='flex items-center gap-2 mt-6'>
                <input type="text" name="task" id="task" placeholder='What needs to be done..' className='flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500' />
                <button type='submit' className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all'>Submit</button>
            </form>
            <ul className='mt-6 space-y-3 w-full max-w-md px-4'>
                {tasks.length === 0 ? (
                    <li className="text-gray-400 text-center">No tasks found.</li>
                ) : (
                    tasks.map((task: TaskType, idx: number) => <Task key={idx} task={task} refetchTasks={refetchTasks} />)
                )}
            </ul>
        </main>
    )
}

export default MainSection
