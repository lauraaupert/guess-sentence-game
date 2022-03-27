import React, { createContext, useState } from "react";

export const SentenceContext = createContext();

// This context provider is passed to any component requiring the context
export const SentenceProvider = ({ children }) => {
  const [sentence, setSentence] = useState("");

  return (
    <SentenceContext.Provider
      value={{
        sentence,
        setSentence,
      }}
    >
      {children}
    </SentenceContext.Provider>
  );
};
