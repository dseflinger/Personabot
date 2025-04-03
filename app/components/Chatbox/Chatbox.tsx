'use client';

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CharacterType, Characters } from '@/app/types/Character';
import { ChatResponse } from '@/app/types/ChatResponse';
import './Chatbox.css'

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
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]); //uncomment when ui done
    const [isTyping, setIsTyping] = useState<boolean>(false);
    // const [messages, setMessages] = useState<Message[]>(fakeData);
    const [character, setCharacter] = useState<CharacterType>(CharacterType.pirate);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const tabClass = (tab: CharacterType) =>
        `px-4 py-2 text-lg font-semibold border-b-2 transition-colors ease-in cursor-pointer ${character === tab ? "border-blue-500 text-blue-600" : "border-transparent hover:border-gray-500 hover:rounded-lg hover:bg-gray-200 border-none"
        }`;

    // todo figure out better way to use keys
    const onSubmitMessage = async (e: any) => {
        // return; // uncomment when ui is done
        if (!input.trim()) return;

        setInput("");
        setIsTyping(true);

        const newUserMessage: Message = { role: "user", content: input };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input, character, history: messages })
        });
        setIsTyping(false);
        if (!response.ok) {
            console.error('Failed to fetch:', response.statusText);
            // todo display some error message
            return;
        }

        const data: ChatResponse = await response.json();
        const newBotMessage: Message = { role: "assistant", content: data.message };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    }

    return (
        <div className="flex flex-col w-full h-[calc(100vh-6rem)]"> {/* This div takes the available space minus header height */}
            <div className="flex space-x-4 bg-blue-50 p-2 justify-center shadow-md">
                <button onClick={() => setCharacter(CharacterType.bard)} className={tabClass(CharacterType.bard)} id="bard">🎭 Bard</button>
                <button onClick={() => setCharacter(CharacterType.pirate)} className={tabClass(CharacterType.pirate)} id="pirate">🏴‍☠️ Pirate</button>
                <button onClick={() => setCharacter(CharacterType.wizard)} className={tabClass(CharacterType.wizard)} id="wizard">🧙‍♂️ Wizard</button>
            </div>
            {/* Container for messages */}
            <div className="overflow-y-auto flex-1 my-2 pt-2 p-2 sm:p-0">
                <div className='flex flex-col gap-y-4 mx-auto max-w-xl w-full'>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`rounded-xl px-3 py-2 ${msg.role === "user" ? "self-end bg-blue-500 text-white" : "self-start bg-gray-300 text-black"}`}>
                            <p>{msg.content}</p>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                    {isTyping && (
                        <div className="typing-indicator">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat input box */}
            <form onSubmit={onSubmitMessage} className="sticky bottom-0 bg-white w-full p-2 sm:p-0">
                <div className="w-full flex justify-center">
                    <div className="p-3 border border-gray-300 rounded-lg mx-auto max-w-2xl w-full shadow-lg">
                        <textarea
                            className="w-full h-15 resize-none outline-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    onSubmitMessage(e);
                                }
                            }}
                            placeholder={Characters[character].placeholderText}
                        />
                        <div className="flex justify-end">
                            <button type="submit" className="shadow-lg hover:shadow-xl p-3 bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
                                <FontAwesomeIcon className="text-white" icon={faArrowUp} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Chatbox