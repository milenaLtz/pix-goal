import apiConfig from '../../../apiConfig.json'

const getUsers = (setUser) => {
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch((error) => console.error('Error fetching users:', error));
}
export default getUsers;
