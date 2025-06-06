import apiConfig from '../../../apiConfig.json'

const getTaskData = (setTask, id, accessToken) => {
  
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then((response) => response.json())
  .then((data) => setTask(data))
  .catch((error) => console.error('Error fetching tasks:', error));
}
export default getTaskData;
