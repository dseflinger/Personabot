import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
    try {
        const completion = openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [
                { "role": "user", "content": "write a haiku about ai" },
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