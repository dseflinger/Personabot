import Chatbox from "./components/Chatbox/Chatbox";

export default function Home() {
  return (
    <div className="w-full">
      <header className="p-4 bg-blue-900 shadow-md sticky top-0 z-10 text-white">
        <h1 className="text-2xl">PersonaBot</h1>
      </header>
      <main className="">
        <Chatbox />
      </main>
    </div>
  );
}
