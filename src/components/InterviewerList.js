import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  //console.log(props.interviewers)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>

      <ul className="interviewers__list">
        {props.interviewers.map((eachInterviewer) => {
          // console.log(eachInterviewer);
          return (
            <InterviewerListItem
              key={eachInterviewer.id}
              name={eachInterviewer.name}
              avatar={eachInterviewer.avatar}
              selected={eachInterviewer.id === props.value}
              setInterviewer={(event) => {props.onChange(eachInterviewer.id)}}
            />
          );
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;