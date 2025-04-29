const doneTaskCheck = (taskData) => {
  const doneTask = {...taskData, taskStatus: '1'};
  return doneTask
}
export default doneTaskCheck;
