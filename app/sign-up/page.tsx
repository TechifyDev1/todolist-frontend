"use client";
import React, { ChangeEvent, useState } from 'react'

const Home = () => {
    const [username, setUsername] = useState<string>("");
    const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Creating user with username:", username);
        const baseUrl = "http://localhost:8080/users";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username})
        }
        try {
            const res = await fetch(baseUrl, requestOptions);
            const data = await res.json();
            localStorage.setItem("userid", data.id);
            setUsername("");
            console.log("User created successfully:", data);
            // Redirect to the chat page or perform any other action
        } catch (e) {
            if (e instanceof Error) {
                console.error("Error creating user:", e.message);
            } else {
                console.error("Unexpected error:", e);
            }
            console.error("Error creating user:", e);
            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4">
            <form
                onSubmit={handleSignUp}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-4 text-purple-500">Sign Up</h1>

                <input
                    type="text"
                    placeholder="Enter a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default Home
