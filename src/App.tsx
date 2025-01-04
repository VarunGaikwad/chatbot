import Chatbody from "./Chatbody";
import Footer from "./Footer";
import Header from "./Header";

export default function App() {
  return (
    <main className="p-2 lg:p-4 h-screen flex flex-col">
      <Header />
      <Chatbody />
      <Footer />
    </main>
  );
}
