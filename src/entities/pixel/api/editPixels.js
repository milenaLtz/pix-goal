import apiConfig from '../../../apiConfig.json'

const editPixels = (newPixelData, accessToken) => {
  console.log('newPixelData before sending: ',newPixelData)
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
      console.log('pixelData edition failed')
    }

    if(response.ok) {
      console.log('pixelData edited successfully')
      return response;
    }})
  .then((data) => data)
  .catch((error) => console.error('Error fetching pixelData:', error))
}
export default editPixels;
