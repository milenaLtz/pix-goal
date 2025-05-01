import apiConfig from '../../../apiConfig.json'

const getPixelsForTask = async (goalId) => {
  console.log(goalId)
  try {
    const response = await fetch(`${apiConfig.BASE_URL}BackendForPixel/api/pixels`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const filtered = data.filter((item) => item.goalId === Number(goalId));

    return filtered[0]
  } catch (error) {
    console.error('Error fetching pixels:', error);
    throw error;
  }
}
export default getPixelsForTask;
