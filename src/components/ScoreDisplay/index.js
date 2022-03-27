import React, { useContext, useState } from "react";
import "./index.css";

const ScoreDisplay = (props) => {
  return <div className="score">Score: {props.score}</div>;
};

export default ScoreDisplay;
