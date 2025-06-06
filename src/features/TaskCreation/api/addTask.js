import apiConfig from '../../../apiConfig.json'

const addTask = (setResponse, taskData, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(taskData)
  })
    .then((response) => {
      if (!response.ok) {
        setResponse('task addition failed')
      }

      if(response.ok) {
        setResponse('task addition successful')
      }})
    .catch((error) => console.error('Error fetching users:', error));
}
export default addTask;
