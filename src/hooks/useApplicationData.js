import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    spots: 0,
  });

  const setDay = function (day) {
    setState((prev) => ({ ...prev, day }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  function updateSpots(appointments, id) {
    const day = state.days.find((selectDay) =>
      selectDay.appointments.includes(id)
    );//checking
    const dayIndex = state.days.findIndex((selectDay) =>
      selectDay.appointments.includes(id)
    );
    console.log("day", day);
    let spots = 0;

    if (!day) {
      return state.days;
    }
    for (const appointmentId of day.appointments) {
      if (appointments[appointmentId].interview === null) {
        spots++;
      }
    }

    let updateDay = {
      ...day,
      spots,
    };

    console.log('update',updateDay)

    let newDays = [...state.days];
    newDays[dayIndex] = updateDay;
    console.log("new", newDays);
    return newDays;
  }

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const days = updateSpots(appointments, id);

        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const days = updateSpots(appointments, id);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
