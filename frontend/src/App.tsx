import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ChatCard from "./components/Card";

function App() {
  const [persona, setPersona] = useState("hitesh");

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:24px_24px] text-white">
      <Navbar
        persona={persona}
        setPersona={setPersona}
      />

      <div className="flex justify-center pt-10">
        <ChatCard persona={persona} />
      </div>
    </div>
  );
}

export default App;