import apiConfig from '../../../apiConfig.json'

const getTasks = (setTasks) => {
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => setTasks(data))
  .catch((error) => console.error('Error fetching tasks:', error));
}
export default getTasks;
