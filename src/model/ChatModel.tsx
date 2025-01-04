import React, { useState } from "react";
import ModelContext from "./Context";

export default function ModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [model, setModel] = useState<object>({});

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}
