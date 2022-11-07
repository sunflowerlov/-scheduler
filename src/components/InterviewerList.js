import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>

      <ul className="interviewers__list">
        {props.interviewers.map((eachInterviewer) => {
          console.log(eachInterviewer);
          return (
            <InterviewerListItem
              key={eachInterviewer.id}
              name={eachInterviewer.name}
              avatar={eachInterviewer.avatar}
              selected={eachInterviewer.id === props.interviewer}
              setInterviewer={(event) => {props.setInterviewer(eachInterviewer.id)}}
            />
          );
        })}
      </ul>
    </section>
  );
}
