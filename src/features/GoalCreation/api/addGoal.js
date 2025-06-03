import apiConfig from '../../../apiConfig.json'

const addGoal = (setResponse, taskData, setPixelData, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/goals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(taskData)
  })
  .then((response) => {
    if (!response.ok) {
      setResponse('goal addition failed')
    }

    if(response.ok) {
      setResponse('goal addition successful')
      return response.json();
    }})
  .then((data) => {
    if (data) {
      setPixelData((prevData) => ({
        ...prevData,
        goalId: data.id
      }));
    }
  })
  .catch((error) => console.error('Error fetching users:', error));
}
export default addGoal;
