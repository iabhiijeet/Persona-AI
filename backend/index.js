import express from"express"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT
import {handleLLM}  from "./llm.js"

const app = express()
app.use(express.json())

app.post("/api/chat",handleLLM)

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
})