
import {hiteshPrompt, piyushPrompt} from "./data.js";
import {askLLM} from "./llmservice.js";

export async function handleLLM(req,res){
  const {persona, message} = req.body;

  let prompt;
  switch(persona){
    case "hitesh":
      prompt = hiteshPrompt;
      break;
    case "piyush":
      prompt = piyushPrompt;
      break;
    default:
      prompt = hiteshPrompt;
  }

  const answer = await askLLM({prompt,message});

  return answer;


}