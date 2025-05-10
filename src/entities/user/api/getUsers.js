import apiConfig from '../../../apiConfig.json'

const getUsers = (setUser, accessToken) => {
  console.log(`Bearer ${accessToken}`)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch((error) => console.error('Error fetching users:', error));
}
export default getUsers;
