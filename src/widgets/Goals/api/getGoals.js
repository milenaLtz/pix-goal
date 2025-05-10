import apiConfig from '../../../apiConfig.json'

const getGoals = (setGoals, accessToken, userId) => {
  console.log(`${apiConfig.BASE_URL}BackendForPixel/api/goals/goals-of-user/${userId}`, accessToken)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/goals/goals-of-user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text().then(text => text ? JSON.parse(text) : null);
  })
  .then((data) => {
    console.log(data)
    if (data) {
      setGoals(data);
    } else {
      setGoals([]);
    }
  })
  .catch((error) => console.error('Error fetching users:', error));
}
export default getGoals;
