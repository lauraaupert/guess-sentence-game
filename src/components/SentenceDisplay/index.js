import React, { useEffect, useState } from "react";
import "./index.css";

const SentenceDisplay = (props) => {
  const [scrambledSentence, setScrambledSentence] = useState("");

  //scramble the API sentence when the props.sentence changes
  useEffect(() => {
    let finalScrambledSentence = "";
    props.sentence
      .toLowerCase()
      .split(" ")
      .forEach((word) => {
        finalScrambledSentence += scrambleWord(word);
      });
    setScrambledSentence(finalScrambledSentence.trim());
  }, [props.sentence]);

  function scrambleWord(word) {
    if (word.length < 4) return word + " ";
    let scrambledWordResult = word[0];
    let lastLetter = word[word.length - 1];
    word = word.split("");
    word.shift();
    word.pop();
    while (word.length > 0) {
      scrambledWordResult += word.splice((word.length * Math.random()) << 0, 1);
    }
    scrambledWordResult += lastLetter + " ";
    return scrambledWordResult;
  }

  //display the scramble sentence
  return (
    <div data-testid="scrambled-sentence" className="scrambled-sentence">
      {scrambledSentence}
    </div>
  );
};

export default SentenceDisplay;
