import React, { useState } from "react";
import ModelContext from "./Context";
import { ModelT } from "../interface/common";

export default function ModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setModel] = useState<ModelT>({
    conversation: [],
  });

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}
