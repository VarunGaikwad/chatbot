export interface ContextModelT {
  model: ModelT;
  setModel: React.Dispatch<React.SetStateAction<ModelT>>;
}

export interface ModelT {
  conversation: ConversationT[];
}

export interface ConversationT {
  id: number;
  type: "ai" | "user" | "error";
  message: string;
}

export interface GeminiHistoryT {
  role: "ai" | "user";
  parts: string[];
}
