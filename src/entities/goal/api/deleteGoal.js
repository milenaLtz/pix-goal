import apiConfig from '../../../apiConfig.json'

const deleteGoal = (setResponse, id, accessToken) => {
  console.log(`${apiConfig.BASE_URL}BackendForPixel/api/goals/${id}`)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/goals/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        setResponse('goal deletion failed')
      }

      if(response.ok) {
        setResponse('goal deleted successful')
      }})
    .catch((error) => console.error('Error fetching users:', error));
}
export default deleteGoal;
