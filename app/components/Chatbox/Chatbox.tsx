'use client';

import React, { useState } from 'react'
import './Chatbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CharacterType } from '@/app/types/Character';
import { ChatResponse } from '@/app/types/ChatResponse';

type Message = { // todo can probably use the built in thing
    role: "user" | "assistant";
    content: string;
}


const Chatbox = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [character, setCharacter] = useState<CharacterType>(CharacterType.pirate);

    // todo figure out better way to use keys
    const onSubmitMessage = async (e: any) => {
        if (!input.trim()) return;

        setInput("");

        const newUserMessage: Message = { role: "user", content: input };
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input, character, history: messages })
        });
        if (!response.ok) {
            console.error('Failed to fetch:', response.statusText);
            return;
        }

        const data: ChatResponse = await response.json();
        const newBotMessage: Message = { role: "assistant", content: data.message };
        setMessages((prevMessages) => [...prevMessages, newUserMessage, newBotMessage]);
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
                {messages.map(msg => (
                    <p>{msg.content}</p>
                ))}
            </div>
            <form onSubmit={onSubmitMessage}>
                <div className='chat-box'>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSubmitMessage(e);
                            }
                        }}
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