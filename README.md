# Persona-AI

Chat with AI personas of popular coding educators — **Hitesh Choudhary** and **Piyush Garg** — powered by the Groq API. Each persona speaks naturally in Hinglish with its own personality, teaching style, and conversational quirks.

## Features

- **Two AI personas** — Hitesh Choudhary (pragmatic mentor, ChaiCode / ex-CTO) and Piyush Garg (software engineer & educator), each with a distinct system prompt and Hinglish communication style
- **Conversational memory** — each persona remembers the current conversation (server-side) until reset
- **Daily rate limiting** — 10 messages per day per IP, with remaining count shown in the UI
- **Reset conversation** — clear the current persona's memory with one click
- **Responsive dark UI** — built with React, TypeScript, and Tailwind CSS v4

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui-style components |
| Backend | Node.js, Express 5 |
| LLM | Groq (`openai/gpt-oss-20b`), `groq-sdk` |
| Validation | zod |

## Project Structure

```
Persona-AI/
├── backend/                  # Express API server
│   ├── index.js              # Server setup, CORS, routes
│   ├── llm.js                # Chat handler, persona selection
│   ├── llmservice.js         # Groq client + conversation memory
│   ├── data.js               # Persona system prompts
│   ├── rateLimiter.js        # Per-IP daily rate limiting
│   └── package.json
└── frontend/                 # React + Vite app
    ├── src/
    │   ├── App.tsx           # Persona switcher + layout
    │   ├── components/
    │   │   ├── Navbar.tsx    # Header with persona toggle
    │   │   └── Card.tsx      # Chat card UI
    │   └── data/personas.ts  # Persona metadata
    ├── .env.example
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- A [Groq](https://console.groq.com) API key

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=3001
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:3001`.

### 2. Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (see `.env.example`):

```
VITE_API_URL=http://localhost:3001
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build the frontend for production

```bash
cd frontend
npm run build
```

## API Endpoints

### `POST /api/chat`

Send a message to a persona.

**Request body:**
```json
{
  "persona": "hitesh",
  "message": "What is a closure?"
}
```

`persona` can be `"hitesh"` or `"piyush"` (defaults to `"hitesh"`).

**Response:**
```json
{
  "reply": "Dekho, closure is basically...",
  "remaining": 9
}
```

Returns `429` with `error` and `retryAfter` when the daily limit is reached.

### `POST /api/reset`

Clear a persona's conversation memory.

**Request body:**
```json
{ "persona": "hitesh" }
```

**Response:**
```json
{ "ok": true }
```

## Configuration

- **CORS** — allowed origins are configured in `backend/index.js`. Add your frontend URL to the `allowedOrigins` array when deploying.
- **Daily limit** — set in `backend/rateLimiter.js` (`DAILY_LIMIT = 10`).
- **Model** — set in `backend/llmservice.js` (`openai/gpt-oss-20b`).
- **Persona prompts** — edit `backend/data.js` to tune personality and teaching style.

## Deployment

- **Frontend** — build with `npm run build` and host the `dist/` folder anywhere (e.g. Vercel).
- **Backend** — deploy the `backend/` folder to a Node host (e.g. Render), set the `GROQ_API_KEY` and `PORT` env vars, and add your frontend's deployed URL to `allowedOrigins`.

## Roadmap / Ideas

- More personas and community-contributed prompts
- Streaming responses
- Persistent chat history (e.g. localStorage or a database)
- Configurable rate limits per persona
