import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const setInterviewer = function (id) {
    return id;
  };

  return (
    <li
      className={InterviewerListItemClass}
      onClick={() => setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
