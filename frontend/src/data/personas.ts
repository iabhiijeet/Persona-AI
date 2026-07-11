import hiteshAvatar from "../assets/hitesh-sir-img.webp";
import piyushAvatar from "../assets/piyush-sir-imh.webp";

export const personas = {
  hitesh: {
    name: "Hitesh Choudhary",
    subtitle: "Pragmatic mentor • ChaiCode • ex-CTO",
    welcome: "Haan bhai! What are we building today?",
    placeholder: "Ask Hitesh anything...",
    avatar: hiteshAvatar,
  },

  piyush: {
    name: "Piyush Garg",
    subtitle: "Software Engineer • Educator",
    welcome: "Let's build something scalable today 🚀",
    placeholder: "Ask Piyush anything...",
    avatar: piyushAvatar,
  },
};

export type Persona = keyof typeof personas;