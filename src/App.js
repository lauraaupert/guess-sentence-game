import React from "react";
import "./App.css";
import DisplayContainer from "./components/Container/index.js";
import { SentenceProvider } from "./utils/sentenceContext";

function App() {
  return (
    <div
      className="App d-flex align-items-center justify-content-center "
      style={{ height: "100vh" }}
    >
      <SentenceProvider>
        <DisplayContainer />
      </SentenceProvider>
    </div>
  );
}

export default App;
