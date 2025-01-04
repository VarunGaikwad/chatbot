import { createContext } from "react";

const ModelContext = createContext<{
  model: object;
  setModel: React.Dispatch<React.SetStateAction<object>>;
} | null>(null);

export default ModelContext;
