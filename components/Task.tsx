import React from 'react'

const Task = () => {
    return (
        <li className='bg-gray-800 p-4 rounded-lg flex justify-between items-center w-full'>
            <span className='text-white'>Task title</span>
            <div className="flex gap-2 items-center">
                <button className="text-green-400 text-2xl">✓</button>
                <button className="text-red-500 text-2xl">🗑</button>
            </div>
        </li>
    );
}

export default Task
