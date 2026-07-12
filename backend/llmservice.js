import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const memory = [];

export async function askLLM({ systemPrompt, message }) {
  if (memory.length === 0) {
    memory.push({
      role: "system",
      content: systemPrompt,
    });
  }

  memory.push({
    role: "user",
    content: message,
  });

  try {
    const response = await groq.chat.completions.create({
      messages: memory,
      model: "openai/gpt-oss-20b",
    });
    const reply = response.choices[0].message.content;

    memory.push({
      role: "assistant",
      content: reply,
    });
    return reply;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
