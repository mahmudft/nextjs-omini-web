"use client"
// Import statements
import { useEffect, useState } from 'react';

// Chat component
export default async function Chat({ params }: { params: { id: number } }) {
  // State for chat messages
  const [messages, setMessages] = useState([{
    
  }]);

  // useEffect to fetch chat messages
  useEffect(() => {
    // Fetch chat messages here
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
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* Chat Messages Go Here */}
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 cursor-pointer ${message.incoming ? '' : 'justify-end'}`}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img src='https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2xvc3RodW1hbnMxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19' alt="User Avatar" className="w-10 h-10 rounded-full" />
              </div>
              <div className={`flex max-w-96 rounded-lg p-3 gap-3 ${message.incoming ? 'bg-white text-gray-700' : 'bg-indigo-500 text-white'}`}>
                <p>{"My Message"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
          </div>
        </footer>
      </div>
    </>
  );
}
