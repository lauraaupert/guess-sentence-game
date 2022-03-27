import React from "react";
import "./index.css";

const TextDisplay = (props) => {
  return (
    <div className="texts">
      <p>{props.textOne}</p>
      <p>{props.textTwo}</p>
    </div>
  );
};

export default TextDisplay;
