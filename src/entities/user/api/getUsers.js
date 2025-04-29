const getUsers = (setUser) => {
  fetch('http://80.90.189.80:8080/BackendForPixel/api/users', {
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
