const doneTaskCheck = (taskData) => {
  const doneTask = {...taskData, status: 'DONE'};
  return doneTask
}
export default doneTaskCheck;
