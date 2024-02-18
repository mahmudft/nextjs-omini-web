"use client"
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import SideBar from "../components/layouts/side-bar.jsx"
import { io } from 'socket.io-client';
import './chat.module.css'

export const socket = io('http://localhost:7089', {
    autoConnect: true,
    withCredentials: true
});
export default function ChatNavbar({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])

    useEffect(() => {
        socket.connect()
        socket.on("connect", () => console.log('Connected'))

        return () => {
            socket.off("connect", () => console.log("Disconnected"))
        }
    }, [])


    const handleSearch = async (event: SyntheticEvent) => {
        const res = await fetch(`http://localhost:7089/search?name=${event.target?.value}`, {
            headers: {
                "Content-Type": "application/json"
              },
              credentials: 'include',
              withCredentials: true,
        })
        const data = await res.json()
        setUsers(data)
    }

    const handleChat = (chat) => {
        setChats((prev) => ([...prev, chat]))
        setUsers([])
    }



    return (
        <div className="w-full h-full ">
            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onChange={handleSearch} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                    {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                </div>
                <div>
                   {users?.map((person, index) => {
                    return (
                        <ul key={person?.id} role="list" className="p-6 divide-y divide-slate-200">


                            <li className="flex py-4 first:pt-0 last:pb-0" onClick={() => handleChat(person)}>
                                 <img className="h-8 w-10 rounded-full" src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2xvc3RodW1hbnMxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19" alt="" />
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-medium text-slate-900">{person?.name}</p>
                                    <p className="text-sm text-slate-500 truncate">{person?.email}</p>
                                </div>
                            </li>

                        </ul>
                    )
                   })}
                </div>
            </form>
            <div className="w-full h-full grid grid-cols-[80px,1fr] gap-4 py-3">
                <SideBar chats={chats}/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}