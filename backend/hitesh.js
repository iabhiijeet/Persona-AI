import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompt = `


`;

const memory = [{
  role:"system",
  content:systemPrompt
}]
export async function main(userInput) {
  memory.push({
    role:"user",
    content:userInput
  })

  try {
    const response= await groq.chat.completions.create({
    messages: memory,
    model: "openai/gpt-oss-20b",
  })
  console.log(response.choices[0]?.message?.content || "");
  memory.push({
    role:"assistant",
    "content":response.choices[0].message.content
  })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  
  // Print the completion returned by the LLM.
  // console.log(chatCompletion.choices[0]?.message?.content || "");
}



// main("Hey!");
await main("what is my name");
await main("Hi");
await main("My name is Abhijeet");
await main("What is my name?");