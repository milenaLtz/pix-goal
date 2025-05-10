import apiConfig from '../../../apiConfig.json'
import undoneTask from '../utils/undoneTask'

const setTaskUndone = (taskData, accessToken) => {
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(undoneTask(taskData))
  })
  .then((response) => {
    if (!response.ok) {
      console.log('pixelData addition failed')
    }

    if(response.ok) {
      console.log('pixelData addition successful')
      return response;
    }})
  .then((data) => data)
  .catch((error) => console.error('Error fetching tasks:', error))
}
export default setTaskUndone;
