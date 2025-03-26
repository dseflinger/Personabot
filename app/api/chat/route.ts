import OpenAI from "openai";
// import ChatCompletionMessageParam from "openai";
import { Character, CharacterType, Characters } from "../../types/Character";
import { NextRequest, NextResponse } from "next/server";
import { ChatResponse } from "@/app/types/ChatResponse";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// let conversationHistory: Array<ChatCompletionMessageParam> = [];

export async function POST(request: NextRequest) {
    const { message, character: characterType, history }:
        { message: string, character: CharacterType, history: Array<{ role: "user" | "assistant"; content: string }> } = await request.json();

    const prompt = Characters[characterType].prompt || "Respond as normally";

    // return NextResponse.json<ChatResponse>({ message: "here's a random text" }, { status: 200 });

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