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

const fakeData: Message[] = [
    { role: "user", content: "Hello there!" },
    { role: "assistant", content: "Arr, ahoy matey! What be yer business on me deck?" },
    { role: "user", content: "im here to take over!" },
    { role: "assistant", content: "Ye dare to challenge me authority on me own ship, ye scurvy dog? Prepare to face the wrath of a true pirate captain! Battle stations, all hands on deck! It be a duel to the death! Arrr!" },
    { role: "user", content: "yes you are nothing" },
    { role: "assistant", content: "Ye be talkin' big for a landlubber! But mark me words, ye be walkin' the plank before the day be done! I be the master of these seas, and ye be nothin' but a measly bilge rat in me way. Prepare to be boarded and meet yer fate, ye scallywag! Arrr!" },
    { role: "user", content: "not today! not ever" },
    { role: "assistant", content: "Ye be a feisty one, I'll give ye that much. But remember, in these waters, I be the law. Ye can try to defy me, but in the end, Davy Jones himself will claim yer soul. Ye be warned, me hearty. But if ye still be wishin' to cross swords with me, then let it be so. The sea be a harsh mistress, and only the strongest survive. Farewell, ye foolhardy landlubber. May Neptune have mercy on yer soul. Arrr!" }
]


const Chatbox = () => {
    const [input, setInput] = useState("");
    // const [messages, setMessages] = useState<Message[]>([]); //uncomment when ui done
    const [messages, setMessages] = useState<Message[]>(fakeData);
    const [character, setCharacter] = useState<CharacterType>(CharacterType.pirate);

    // todo figure out better way to use keys
    const onSubmitMessage = async (e: any) => {
        return; // uncomment when ui is done
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
        <div className='p-4 flex flex-col h-[calc(100vh-8rem)]'>
            {/* chat Messages todo make this its own component */}
            <div className='flex flex-col gap-y-4 overflow-y-auto' >
                {
                    messages.map(msg => (
                        <div className={msg.role == "user" ? "self-end bg-blue-500 text-white rounded-lg p-3" : "self-start bg-gray-300 text-black"}>
                            <p> {msg.content}</p>
                        </div>
                    ))
                }
            </div>
            <form onSubmit={onSubmitMessage} className="sticky bottom-0 mt-3 bg-white">
                <div className='p-3 border-1 rounded-lg h-30 z-99'>
                    <textarea
                        className='h-9 outline-none resize-none h-15 w-full'
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
                    <div className='flex justify-end'>
                        <button type="submit" className='p-3 bg-blue-500 rounded-full w-8 h-8 flex justify-center align-center items-center cursor-pointer'>
                            <FontAwesomeIcon className='submit-icon text-white' icon={faArrowUp} />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Chatbox