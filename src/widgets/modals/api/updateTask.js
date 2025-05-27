import apiConfig from '../../../apiConfig.json'

const updateTask = (taskData, accessToken, setResponse) => {
  console.log(JSON.stringify(taskData), accessToken)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(taskData)
  })
  .then((response) => {
    if (!response.ok) {
      setResponse('task update failed')
    }

    if(response.ok) {
      setResponse('task update successful')
    }})
  .catch((error) => console.error('Error fetching users:', error));
}
export default updateTask;
