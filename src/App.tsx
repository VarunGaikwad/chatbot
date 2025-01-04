import Chatbody from "./Chatbody";
import Footer from "./Footer";

export default function App() {
  return (
    <main className="p-2 lg:p-4 h-screen flex flex-col">
      <header>
        <p className="text-2xl">Gemini</p>
      </header>
      <Chatbody />
      <Footer />
    </main>
  );
}
