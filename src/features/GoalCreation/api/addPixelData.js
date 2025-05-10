import apiConfig from '../../../apiConfig.json'

const addPixelData = async (pixelData, setResponsePixels, accessToken) => {
  console.log(pixelData)
  try {
  const response = await fetch(`${apiConfig.BASE_URL}BackendForPixel/api/pixels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorizations': `Bearer ${accessToken}`
     },
    body: JSON.stringify(pixelData)
  });

  if (!response.ok) {
    throw new Error('Ошибка при создании пикселей');
  }

  if(response.ok) {
    setResponsePixels('pixels added successfully');
  }

  return await response.json();
  } catch (error) {
    console.error(error)
  }
};

export default addPixelData;
