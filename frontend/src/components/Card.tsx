import { ArrowUp, RotateCcw } from "lucide-react";
import { type Persona, personas } from "../data/personas";

type ChatCardProps = {
  persona: Persona;
};

export default function ChatCard({ persona }: ChatCardProps) {
  const current = personas[persona];

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-zinc-800 bg-[#18181B] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <img src={current.avatar} className="h-14 w-14 rounded-full object-cover bg-zinc-700"/>
      

          <div>
            <h2 className="text-xl font-semibold text-white">
              {current.name}
            </h2>

            <p className="text-sm text-zinc-400">
              {current.subtitle}
            </p>
          </div>

        </div>

        <button className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-zinc-300 transition hover:bg-zinc-700">
          <RotateCcw size={18} />
        </button>

      </div>

      {/* Chat Area */}

      <div className="flex h-[600px] flex-col justify-between bg-[#151515]">

        {/* Empty State */}

        <div className="flex flex-1 items-center justify-center px-8">

          <div className="text-center">

            <img src={current.avatar} className="mx-auto mb-6 h-16 w-16 rounded-2xl object-cover bg-zinc-800"/>
              
            

            <h2 className="text-2xl font-semibold text-white">
              Chat with {current.name.split(" ")[0]}
            </h2>

            <p className="mt-3 max-w-md text-zinc-400">
              {current.welcome}
            </p>

          </div>

        </div>

        {/* Input */}

        <div className="border-t border-zinc-800 p-5">

          <div className="flex items-end gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-3">

            <textarea
              rows={1}
              placeholder={current.placeholder}
              className="max-h-40 flex-1 resize-none bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
            />

            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black transition hover:bg-zinc-200">
              <ArrowUp size={20} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}