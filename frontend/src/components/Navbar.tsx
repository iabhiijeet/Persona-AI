export default function Navbar({ persona, setPersona }: { persona: string, setPersona: (persona: string) => void }) {
  return (
    <header className="w-full border-b border-zinc-800 bg-[#111111]">
      <div className="mx-auto flex h-auto min-h-16 flex-col gap-3 px-4 py-3 sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0">

        <div className="flex items-center gap-3">
          <img src="/persona-image.webp" alt="Persona Chat" className="h-9 w-9 rounded-lg object-cover sm:h-11 sm:w-11" />
          <div>
            <h1 className="text-lg font-bold sm:text-2xl">
              Persona Chat
            </h1>
            <p className="text-xs text-zinc-400 sm:text-sm">
              Chatting with{" "}
              <span className="text-zinc-200">
                {persona === "hitesh" ? "Hitesh Sir" : "Piyush Sir"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 self-end sm:gap-3 sm:self-auto">
          <button
            onClick={() => setPersona("hitesh")}
            className={`rounded-full px-3 py-1.5 text-sm transition sm:px-4 sm:py-2 ${
              persona === "hitesh"
                ? "bg-white text-black"
                : "border border-zinc-700 text-zinc-300 hover:bg-zinc-900"
            }`}
          >
            Hitesh
          </button>

          <button
            onClick={() => setPersona("piyush")}
            className={`rounded-full px-3 py-1.5 text-sm transition sm:px-4 sm:py-2 ${
              persona === "piyush"
                ? "bg-white text-black"
                : "border border-zinc-700 text-zinc-300 hover:bg-zinc-900"
            }`}
          >
            Piyush
          </button>
        </div>

      </div>
    </header>
  );
}
