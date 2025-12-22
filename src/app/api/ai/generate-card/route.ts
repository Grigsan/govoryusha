import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_KEY || process.env.OPENROUTER_API_KEY_DEEPSEEK || process.env.OPENROUTER_API_KEY_OLMO,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert at designing AAC (Augmented and Alternative Communication) cards for children. \n\nTasks:\n1. IMPROVE LABEL: Convert messy or telegram-style Russian text into a clear, single-noun or simple-phrase label (e.g., 'пить томат' -> 'Томатный сок', 'хочу кушать яблоко' -> 'Яблоко').\n2. SUGGEST ICONS: Always suggest exactly 5 Lucide icon names that best represent the concept. \n\nGuidelines for icons:\n- If it's a drink, suggest 'CupSoda', 'GlassWater', 'Droplets'.\n- If it's food, suggest 'Utensils', 'Apple', 'Pizza', 'Beef'.\n- If it's an action, suggest 'Hand', 'Footprints', 'Play'.\n\nFormat: { \"label\": \"Улучшенное название\", \"icons\": [\"Icon1\", \"Icon2\", \"Icon3\", \"Icon4\", \"Icon5\"] }"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    return NextResponse.json(JSON.parse(content || '{}'));
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate card' }, { status: 500 });
  }
}

