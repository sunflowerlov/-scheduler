import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
   classNames(buttonClass, {"button--confirm": props.confirm});
   classNames(buttonClass, {"button--danger": props.danger});

    return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
 }
 
