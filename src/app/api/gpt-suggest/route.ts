// app/api/gpt-suggest/route.ts

import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Use a valid model here (ensure you have access to GPT-3.5 or GPT-4)
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching GPT reply:", error);
    return NextResponse.json({ error: "Failed to fetch GPT reply" }, { status: 500 });
  }
}
