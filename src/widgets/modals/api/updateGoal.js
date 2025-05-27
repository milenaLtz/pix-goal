import apiConfig from '../../../apiConfig.json'

const updateGoal = (goalData, accessToken, setResponse) => {
  console.log(JSON.stringify(goalData), accessToken)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/goals`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(goalData)
  })
  .then((response) => {
    if (!response.ok) {
      setResponse('goal update failed')
    }

    if(response.ok) {
      setResponse('goal update successful')
    }})
  .catch((error) => console.error('Error fetching users:', error));
}
export default updateGoal;
