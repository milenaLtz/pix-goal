import apiConfig from '../../../apiConfig.json'

const getGoals = (setGoals, accessToken) => {
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/goals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Autorization': `Bearer ${accessToken}`
    }
  })
  .then((response) => response.json())
  .then((data) => setGoals(data))
  .catch((error) => console.error('Error fetching users:', error));
}
export default getGoals;
