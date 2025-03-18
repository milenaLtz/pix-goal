const getUsers = (setUser) => {
  fetch('/api/PixelBackendScripted/api/users')
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch((error) => console.error('Error fetching users:', error));
}
export default getUsers;
