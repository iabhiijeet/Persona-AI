
import { hiteshPrompt, piyushPrompt } from "./data.js";
import { askLLM } from "./llmservice.js";

export async function handleLLM(req, res) {
  const { persona, message } = req.body;

  let systemPrompt;
  switch (persona) {
    case "hitesh":
      systemPrompt = hiteshPrompt;
      break;
    case "piyush":
      systemPrompt = piyushPrompt;
      break;
    default:
      systemPrompt = hiteshPrompt;
  }

  try {
    const answer = await askLLM({ systemPrompt, message });
    res.json({ reply: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}