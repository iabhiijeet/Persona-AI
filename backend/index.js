import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import { handleLLM } from "./llm.js";
import { resetMemory } from "./llmservice.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", handleLLM);

app.post("/api/reset", (req, res) => {
  const { persona } = req.body;
  resetMemory(persona);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
