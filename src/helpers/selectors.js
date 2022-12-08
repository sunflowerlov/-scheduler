export function getAppointmentsForDay(state, day) {
  const dayArr = state.days
  const appointmentObj = state.appointments
  let result = [];
  for (const eachDay of dayArr) {
    if (eachDay.name === day) {
      for (const eachId of eachDay.appointments) {
        result.push(appointmentObj[eachId])
      }
    }
  }
  return result
}

export function getInterview(state, interview) {
  if(!interview) {
    return null
  }
  const interviewersObj = state.interviewers
  const interviewerId = interview.interviewer
  let result = {}
  result.student = interview.student
  result.interviewer = interviewersObj[interviewerId]
  return result
}

export function getInterviewersForDay (state, day) {
  const dayArr = state.days
  const interviewersObj = state.interviewers
  let result = [];
  for (const eachDay of dayArr) {
    if (eachDay.name === day) {
      for (const eachId of eachDay.interviewers) {
        result.push(interviewersObj[eachId])
      }
    }
  }
  return result
}