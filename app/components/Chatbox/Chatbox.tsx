'use client';

import React, { useState } from 'react'
import './Chatbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

type Message = { // todo can probably use the built in thing
    role: "user" | "ai";
    content: string;
}


const Chatbox = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    // todo figure out better way to use keys

    const sendMessage = async (e: any) => {
        if (!input.trim()) return;

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

    return (
        <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
            <h1>PersonaBot</h1>
            <div>
                {/* todo fix */}
                {/* {messages.map((msg, i) => (
                    <p key={i}><strong>{msg.user}:</strong> {msg.text}</p>
                ))} */}
            </div>

            {/* chat Messages todo make this its own component */}
            <div>

            </div>
            <form onSubmit={sendMessage}>
                <div className='chat-box'>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Say something..."
                    />
                    <div className='chat-box-footer'>
                        <button type="submit"><FontAwesomeIcon className='submit-icon' icon={faArrowUp} />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Chatbox