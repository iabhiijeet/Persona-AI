import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const conversations = new Map();

export function resetMemory(persona) {
  conversations.delete(persona);
}

export async function askLLM({ persona, systemPrompt, message }) {
  if (!conversations.has(persona)) {
    conversations.set(persona, [
      { role: "system", content: systemPrompt },
    ]);
  }

  const memory = conversations.get(persona);
  memory.push({ role: "user", content: message });

  const response = await groq.chat.completions.create({
    messages: memory,
    model: "openai/gpt-oss-20b",
  });

  const reply = response.choices[0].message.content;
  memory.push({ role: "assistant", content: reply });

  return reply;
}
