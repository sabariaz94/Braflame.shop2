'use client';

import { useEffect, useState } from 'react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, index) => (
            <li key={index} className="border p-3 rounded">
              <p><strong>{msg.name}</strong> ({msg.email})</p>
              <p>{msg.message}</p>
              <p className="text-sm text-gray-500">{new Date(msg.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
