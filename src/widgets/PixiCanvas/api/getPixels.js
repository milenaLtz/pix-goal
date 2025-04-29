import apiConfig from '../../../apiConfig.json'

const getPixels = (setPixels, goalId, setPixelEntity) => {
  console.log(goalId)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/pixels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    const filtered = data.filter((item) => item.goalId === Number(goalId));
    if (filtered.length > 0) {
      setPixelEntity(filtered[0]);
      const parsedPixelData = JSON.parse(filtered[0].pixelData);
      // localStorage.setItem('pixels', filtered[0].pixelData);
      setPixels(parsedPixelData);
      console.log(parsedPixelData);
    };
  })
  .catch((error) => console.error('Error fetching pixels:', error));
}
export default getPixels;
