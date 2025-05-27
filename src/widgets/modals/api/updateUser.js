import apiConfig from '../../../apiConfig.json'

const updateUser = (userData, accessToken, setResponse) => {
  console.log(JSON.stringify(userData), accessToken)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(userData)
  })
  .then((response) => {
    if (!response.ok) {
      setResponse('user update failed')
    }

    if(response.ok) {
      setResponse('user update successful')
    }})
  .catch((error) => console.error('Error fetching users:', error));
}
export default updateUser;
