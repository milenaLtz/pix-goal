import apiConfig from '../../../apiConfig.json'

const getGoal = (setGoal, id, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/goals/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then((response) => response.json())
    .then((data) => setGoal(data))
    .catch((error) => console.error('Error fetching users:', error));
}
export default getGoal;
