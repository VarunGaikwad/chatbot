import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ModelProvider from "./model/ChatModel.tsx";

createRoot(document.getElementById("root")!).render(
  <ModelProvider>
    <App />
  </ModelProvider>
);
