import doneTaskCheck from "../utils/doneTaskCheck"
import apiConfig from '../../../apiConfig.json'

const setTaskDone = (taskData) => {
  console.log(doneTaskCheck(taskData))
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doneTaskCheck(taskData))
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
export default setTaskDone;
