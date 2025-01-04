import { createContext } from "react";
import { ContextModelT } from "../interface/common";

const ModelContext = createContext<ContextModelT | null>(null);

export default ModelContext;
