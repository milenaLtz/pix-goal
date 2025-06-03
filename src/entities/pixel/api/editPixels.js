import apiConfig from '../../../apiConfig.json'

const editPixels = (newPixelData, accessToken) => {

  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/pixels`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(newPixelData)
  })
  .then((response) => {
    if (!response.ok) {
    }

    if(response.ok) {
      return response;
    }})
  .then((data) => data)
  .catch((error) => console.error('Error fetching pixelData:', error))
}
export default editPixels;
