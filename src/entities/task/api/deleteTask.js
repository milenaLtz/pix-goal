import apiConfig from '../../../apiConfig.json'

const deleteTask = ( id, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then((response) => {
      if (!response.ok) {

      }

      if(response.ok) {

      }})
    .catch((error) => console.error('Error fetching users:', error));
}
export default deleteTask;
