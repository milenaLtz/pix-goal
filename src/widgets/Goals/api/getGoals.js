const getGoals = (setGoals) => {
  fetch('/api/PixelBackendScripted/api/goals')
  .then((response) => response.json())
  .then((data) => setGoals(data))
  .catch((error) => console.error('Error fetching users:', error));
}
export default getGoals;
