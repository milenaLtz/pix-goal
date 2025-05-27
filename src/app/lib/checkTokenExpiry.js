const checkTokenExpiry = (token) => {
  // const creationTokenDate = new Date(localStorage.getItem('creationTokenDate'));
  // const currentDate = new Date();
  // const maxAgeInMilliseconds = 60 * 60 * 1000;
  // if (currentDate - creationTokenDate > maxAgeInMilliseconds) {
  //   localStorage.removeItem('creationTokenDate');
  //   localStorage.removeItem('token');
  // }
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
export default checkTokenExpiry;
