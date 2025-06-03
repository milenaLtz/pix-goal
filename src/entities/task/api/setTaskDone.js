import doneTaskCheck from "../utils/doneTaskCheck"
import apiConfig from '../../../apiConfig.json'

const setTaskDone = (taskData, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(doneTaskCheck(taskData))
  })
  .then((response) => {
    if (!response.ok) {
    }

    if(response.ok) {
      return response;
    }})
  .then((data) => data)
  .catch((error) => console.error('Error fetching tasks:', error))
}
export default setTaskDone;
