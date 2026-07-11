import { PlusSquare } from "lucide-react";

export default function Navbar({ persona, setPersona }: { persona: string, setPersona: (persona: string) => void }) {
  return (
    <header className="w-full border-b border-zinc-800 bg-[#111111]">
      <div className="mx-auto flex h-20 items-center justify-between px-6">

        <div>
          <h1 className="text-2xl font-bold">
            Persona Chat
          </h1>

          <p className="text-sm text-zinc-400">
            Chatting with{" "}
            <span className="text-zinc-200">
              {persona === "hitesh"
                ? "Hitesh Sir"
                : "Piyush Sir"}
            </span>
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setPersona("hitesh")}
            className={`rounded-full px-4 py-2 transition
              ${
                persona === "hitesh"
                  ? "bg-white text-black"
                  : "border border-zinc-700 text-zinc-300 hover:bg-zinc-900"
              }`}
          >
            Hitesh Sir
          </button>

          <button
            onClick={() => setPersona("piyush")}
            className={`rounded-full px-4 py-2 transition
              ${
                persona === "piyush"
                  ? "bg-white text-black"
                  : "border border-zinc-700 text-zinc-300 hover:bg-zinc-900"
              }`}
          >
            Piyush Sir
          </button>

          

        </div>
      </div>
    </header>
  );
}