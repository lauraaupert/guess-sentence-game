import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import TextDisplay from "../TextDisplay";
import ScoreDisplay from "../ScoreDisplay";
import SentenceDisplay from "../SentenceDisplay";
import TypingSection from "../TypingSection";
import { SentenceContext } from "../../utils/sentenceContext";
import api from "../../utils/api";
import "./index.css";

function DisplayContainer() {
  const [currentSentence, setCurrentSentence] = useState(1);
  const [score, setScore] = useState(0);
  const [sentence, setSentence] = useState("");

  const context = useContext(SentenceContext);
  const instructionsOne = "Guess the sentence! Start typing.";
  const instructionsTwo = "The yellow blocks are meant for spaces";

  //if the user has not been through the ten sentences,
  //make a call to the API to get a new sentence to guess when the currentSentence counter increments
  useEffect(() => {
    if (score < 10) {
      api.getSentence(currentSentence).then((response) => {
        context.setSentence(response);
        setSentence(response.toLowerCase());
      });
    }
    return () => {
      setSentence("");
    };
  }, [currentSentence, score, context]);

  return score < 10 ? (
    sentence ? (
      <Container>
        <SentenceDisplay sentence={sentence} />
        <TextDisplay textOne={instructionsOne} textTwo={instructionsTwo} />
        <ScoreDisplay score={score} />
        {context.sentence && (
          <TypingSection
            sentence={context.sentence}
            setCurrentSentence={setCurrentSentence}
            currentSentence={currentSentence}
            score={score}
            setScore={setScore}
          />
        )}
      </Container>
    ) : (
      <Container>Loading...</Container>
    )
  ) : (
    <Container>
      <p style={{ marginBottom: "0px" }}>You win!</p>
    </Container>
  );
}

export default DisplayContainer;
