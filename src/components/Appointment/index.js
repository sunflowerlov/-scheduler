import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(ERROR_SAVE, true)
    })
  }

  function remove() {
    transition(DELETE, true);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
    })
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVE && <Status message={"saving..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure to delete?"}
          onDelete={remove}
          onBack={() => transition(SHOW)}
        />
      )}
      {mode === DELETE && <Status message={"deleting..."} />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message={'could not cancel appointment'}/>}
      {mode === ERROR_DELETE && <Error message={'could not cancel appointment'} onClose={() => back(SHOW)}/>}
      
    </article>
  );
}
