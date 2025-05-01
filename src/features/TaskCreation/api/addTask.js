import apiConfig from '../../../apiConfig.json'

const addTask = (setResponse, taskData) => {
  console.log('task data before sending: ',JSON.stringify(taskData))
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
    .then((response) => {
      if (!response.ok) {
        setResponse('goal addition failed')
      }

      if(response.ok) {
        setResponse('goal addition successful')
      }})
    .catch((error) => console.error('Error fetching users:', error));
}
export default addTask;
