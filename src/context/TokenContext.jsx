/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// ✅ إنشاء Context جديد لحفظ القيم بين الصفحات
export const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [inputTokens, setInputTokens] = useState("");
  const [outputTokens, setOutputTokens] = useState("");

  return (
    <TokenContext.Provider value={{ inputTokens, setInputTokens, outputTokens, setOutputTokens }}>
      {children}
    </TokenContext.Provider>
  );
}
