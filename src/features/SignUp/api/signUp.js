import apiConfig from '../../../apiConfig.json'

const signUp = (signUpData, setResponse, setErrorResponse) => {
  
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  })
  .then(async response => {
    const responseText = await response.text();

    if (!response.ok) {
      console.error('Response text:', responseText);
      try {
        const errorData = JSON.parse(responseText);
        setErrorResponse(errorData.message);
        setResponse('sign up failed');
        console.error('Parsed error:', errorData);
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
      setErrorResponse('Не удалось зарегистрироваться');
      return;
    }
    if(response.ok) {
      setResponse('sign up successful');
    }
  })
  .catch(error => {
    console.error('ErrorType: ', error);
  })
};
export default signUp;
