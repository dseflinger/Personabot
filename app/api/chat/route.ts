import OpenAI from "openai";
// import ChatCompletionMessageParam from "openai";
import { Character, CharacterType, Characters } from "./Character";
import { NextRequest } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// let conversationHistory: Array<ChatCompletionMessageParam> = [];

export async function POST(request: NextRequest) {
    const { message, characterType }: { message: string, characterType: CharacterType } = await request.json();

    const prompt = Characters[characterType].prompt || "Respond as normally";

    try {
        const completion = openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            store: true,
            messages: [
                { "role": "developer", "content": prompt }, // todo should this be system or developer?
                { "role": "user", "content": message },
            ],
        });

        const result = await completion;
        const haiku = result.choices[0]?.message?.content || "No haiku generated"
        return new Response(haiku, { status: 200 })
    }
    catch (error) {
        // todo fix error handling?
        return new Response(`Failed to generate haiku with error: ${error}`, { status: 400 })
    }
}