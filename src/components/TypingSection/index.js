import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import TypingBlock from "../TypingBlock";
import "./index.css";
import NextButton from "../NextButton";

const TypingSection = (props) => {
  const [guessedRight, setGuessedRight] = useState(false);

  //render a typing block per letter of the API sentence
  //render the next button if the input sentence is correct
  return (
    <>
      <Row
        data-testid="typing-section"
        className="section gx-2"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        {props.sentence &&
          props.sentence
            .toLowerCase()
            .split("")
            .map((letter, index) => {
              return letter === " " ? (
                <React.Fragment key={index}>
                  <Col key={index}>
                    <TypingBlock
                      sentence={props.sentence}
                      letter={letter}
                      index={index}
                      setGuessedRight={setGuessedRight}
                    />
                  </Col>
                  <hr />
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <Col key={index}>
                    <TypingBlock
                      letter={letter}
                      index={index}
                      setGuessedRight={setGuessedRight}
                    />
                  </Col>
                </React.Fragment>
              );
            })}
      </Row>
      {(guessedRight || props.sentence === "") && (
        <Row className="button-section">
          <NextButton
            score={props.score}
            currentSentence={props.currentSentence}
            setGuessedRight={setGuessedRight}
            setCurrentSentence={props.setCurrentSentence}
            setScore={props.setScore}
          />
        </Row>
      )}
    </>
  );
};

export default TypingSection;
