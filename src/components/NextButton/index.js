import React from "react";
import Button from "react-bootstrap/Button";
import "./index.css";

const NextButton = (props) => {
  function validate() {
    const nextSentence = Number(props.currentSentence) + 1;
    const newScore = props.score + 1;
    props.setCurrentSentence(nextSentence);
    props.setScore(newScore);
    props.setGuessedRight(false);
  }
  return (
    <Button
      className="next-button"
      size="md"
      autoFocus
      style={{ backgroundColor: "#388e3c" }}
      onClick={validate}
    >
      Next
    </Button>
  );
};

export default NextButton;
