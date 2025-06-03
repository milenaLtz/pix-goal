import apiConfig from '../../../apiConfig.json'

const getPixels = (setPixels, goalId, setPixelEntity, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/pixels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then((response) => response.json())
  .then((data) => {
    const filtered = data.filter((item) => item.goalId === Number(goalId));
    if (filtered.length > 0) {
      setPixelEntity(filtered[0]);
      const parsedPixelData = JSON.parse(filtered[0].pixelData);
      setPixels(parsedPixelData);
    };
  })
  .catch((error) => console.error('Error fetching pixels:', error));
}
export default getPixels;
