"use client"

import { log } from 'console';
// Import statements
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
let socket: any
import useSWR from 'swr';

function fetcher(args) {
  return fetch(...args, ...{
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    withCredentials: true,
  }).then(res => res.json())

}
// Chat component
export default function Chat({ params, query }: { params: { id: number }, query: { name: string } }) {
  // State for chat messages
  let message = useRef('')
  const [messages, setMessages] = useState([])
  // const ChatID = messages[0].chat
  // const { data } = useSWR(`http://localhost:7089/chat/chatmessages?page=0&receiverId=${params.id}`,fetcher)
  const [panel, setPanel] = useState('')
  let prms = (new URL(window.document.location)).searchParams;
  let name = prms.get("name");
  console.log(name)
  socket = io(`http://localhost:7089/`, {
    autoConnect: true,
    withCredentials: true
  });
  socket.connect()




  const sendUserMessage = async () => {
    try {
      const value: any = message.current.value;
      console.log(value);

      await fetch('http://localhost:7089/chat/sendmessage', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          "receiverId": params.id,
          "content": value
        })
      })
      socket.emit('chat-message', JSON.stringify({
        "receiverId": params.id,
        "content": value
      }))
      // setTimeout(() => mutate(), 2000)

    } catch (error) {
      alert(JSON.stringify(error))
    } finally {
      message.current.value = ''
    }
  }

  async function getMessage() {
    const res = await fetch(`http://localhost:7089/chat/chatmessages?page=0&receiverId=${params.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      withCredentials: true,
    })
    const data = await res.json()
    setMessages(data)
  }
  // useEffect to fetch chat messages
  useEffect(() => {
    // Fetch chat messages here
    if(!messages.length){
      getMessage()
    }
    socket.on('chat-message', (msg: any) => {
      console.log(typeof msg);
      let searchable = messages.find(el => el._id == msg._id)
      console.log("Searchable", searchable);
      
      if(!searchable){
        setMessages(prev => ([...prev, msg]))
      }

      console.log("Effect Hook", msg)
    })


  }, []);

  // Function to handle sending messages
  const sendMessage = () => {
    // Implement message sending logic here
  };

  return (
    <>
      <div className="flex-1">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{name}</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* Chat Messages Go Here */}
          {messages?.map((message, index) => (
            <div key={index} className={`flex mb-4 cursor-pointer ${message.senderId == params.id ? '' : 'justify-end'}`}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' alt="User Avatar" className="w-10 h-10 rounded-full" />

              </div>
              <div className={`flex max-w-96 rounded-lg p-3 gap-3 ${message.senderId == params.id ? 'bg-white text-gray-700' : 'bg-indigo-500 text-white'}`}>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              ref={message}
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button onClick={sendUserMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
          </div>
        </footer>
      </div>
    </>
  );
}
