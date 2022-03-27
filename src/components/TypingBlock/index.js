import React, { useEffect, useState, useContext } from "react";
import "./index.css";

const TypingBlock = (props) => {
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#e1e1e1");
  const [fontColor, setFontColor] = useState("black");

  //make sure click events don't unfocus the typing block
  let focused = document.activeElement.id;

  window.addEventListener("click", () => {
    document.getElementById(focused).focus();
  });

  //set the font color depending on block's background color
  //(white for green, black for other)
  useEffect(() => {
    if (color === "#4caf50") {
      setFontColor("white");
    } else {
      setFontColor("black");
    }
  }, [color]);

  //when the new sentence is fetched from the API and stored in the Context,
  //emtpy the input blocks and resets their color
  useEffect(() => {
    setColor("#e1e1e1");
    document.getElementById("0").focus();

    if (props.letter === " ") setColor("#ffb74d");
    setValue("");
  }, [props.letter]);

  //Change the block's color to orange, green, or grey depending on input and position
  function onInput(e) {
    setValue(e.target.value);
    //if there is a next empty block and the current one is full
    //switch focus to next empty block
    if (
      e.target.value.length === e.target.maxLength &&
      document.getElementById((Number(e.target.id) + 1).toString())
    ) {
      document.getElementById((Number(e.target.id) + 1).toString()).focus();
    }
    //if the guess is correct for this block, change the color to green
    if (e.target.name === e.target.value.toLowerCase()) {
      setColor("#4caf50");
    } else if (e.target.name === " ") {
      setColor("#ffb74d");
    } else {
      setColor("#e1e1e1");
    }
    //if the whole input sentence is right, switch to true so the next button appears
    if (
      !document.getElementById((Number(e.target.id) + 1).toString()) &&
      e.target.name === e.target.value.toLowerCase()
    ) {
      props.setGuessedRight(true);
    }
  }

  //Change the background color of the block and focus on the previous block
  //when "backspace" is pressed
  function onBackKeyDown(e) {
    if (e.keyCode === 8 && e.target.value.length === 0) {
      if (e.target.id !== "0") {
        document.getElementById((Number(e.target.id) - 1).toString()).focus();
        if (e.target.name === " ") {
          setColor("#ffb74d");
        } else {
          setColor("#e1e1e1");
        }
      } else if (e.target.id === "0") {
        setColor("#e1e1e1");
      }
    }
  }

  //Render a block for each passed letter. If it is the first letter,
  //put it in autofocus so user does not have touch the mouse
  return props.index === 0 ? (
    <div className="block" style={{ marginRight: "20px" }}>
      <input
        className="input"
        maxLength="1"
        id={props.index}
        name={props.letter}
        autoFocus
        onChange={onInput}
        onKeyDown={onBackKeyDown}
        style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
        value={value}
        data-testid={`input-block ${props.index}`}
      ></input>
    </div>
  ) : (
    <div className="block">
      <input
        className="input"
        maxLength="1"
        id={props.index}
        name={props.letter}
        onChange={onInput}
        onKeyDown={onBackKeyDown}
        style={{ backgroundColor: `${color}`, color: `${fontColor}` }}
        value={value}
        data-testid={`input-block ${props.index}`}
      ></input>
    </div>
  );
};

export default TypingBlock;
