import apiConfig from '../../../apiConfig.json'

const getTasks = (setTasks, accessToken) => {
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then((response) => response.json())
  .then((data) => setTasks(data))
  .catch((error) => console.error('Error fetching tasks:', error));
}
export default getTasks;
