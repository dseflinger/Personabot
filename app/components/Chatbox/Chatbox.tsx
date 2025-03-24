'use client';

import React, { useState } from 'react'
import './Chatbox.css'

const Chatbox = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    // todo figure out better way to use keys

    const generateHaiku = async (e: any) => {
        e.preventDefault();
        const response = await fetch('/api/generate-haiku', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: "Write a haiku about AI" })
        });
        if (!response.ok) {
            console.error('Failed to fetch:', response.statusText);
            return;
        }

        const haiku = await response.text();
        console.log(haiku);
    }

    const handleSubmit = async (e: any) => {

        // e.preventDefault();
        // if (!input) return;

        // const response = await fetch('/api/chat', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message: input }),
        // });

        // const data = await response.json();
        // //todo fix
        // // setMessages([...messages, { user: 'You', text: input }, { user: 'Bot', text: data.reply }]);
        // setInput('');
    };
    return (
        <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
            <h1>PersonaBot</h1>
            <div>
                {/* todo fix */}
                {/* {messages.map((msg, i) => (
                    <p key={i}><strong>{msg.user}:</strong> {msg.text}</p>
                ))} */}
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            test
            <form onSubmit={generateHaiku}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Say something..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chatbox