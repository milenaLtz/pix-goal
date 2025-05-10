const undoneTask = (taskData) => {
  const doneTask = {...taskData, status: 'IN_PROCESS'};
  return doneTask
}
export default undoneTask;
