import apiConfig from '../../../apiConfig.json'

const deleteTask = (setResponse, id) => {
  console.log(`${apiConfig.BASE_URL}BackendForPixel/api/tasks/${id}`)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        setResponse('task deletion failed')
      }

      if(response.ok) {
        setResponse('task deleted successful')
      }})
    .catch((error) => console.error('Error fetching users:', error));
}
export default deleteTask;
