export function getAppointmentsForDay(state, day) {
  const dayArr = state.days
  const appointmentArr = state.appointments
  let result = [];
  for (const eachDay of dayArr) {
    if (eachDay.name === day) {
      for (const eachId of eachDay.appointments) {
        result.push(appointmentArr[eachId])
      }
    }
  }
  return result
}
