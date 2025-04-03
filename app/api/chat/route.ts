import OpenAI from "openai";
import { CharacterType, Characters } from "../../types/Character";
import { NextRequest, NextResponse } from "next/server";
import { ChatResponse } from "@/app/types/ChatResponse";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    const { message, character: characterType, history }:
        { message: string, character: CharacterType, history: Array<{ role: "user" | "assistant"; content: string }> } = await request.json();

    const prompt = Characters[characterType].prompt || "Respond as normally";

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            store: true,
            messages: [
                { "role": "system", "content": prompt },
                ...history,
                { "role": "user", "content": message },
            ],
        });

        // todo add streaming
        // todo add api limits
        // todo add localstorage to save history
        // todo add ability for multiple chats maybe?
        const reply = response.choices[0]?.message?.content || "No response generated"
        return NextResponse.json<ChatResponse>({ message: reply }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json<ChatResponse>(
            { error: `Failed to generate response with error: ${error}`, message: "" },
            { status: 400 }
        );
    }
}