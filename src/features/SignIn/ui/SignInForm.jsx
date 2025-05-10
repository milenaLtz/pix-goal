import { useState, useEffect } from "react";
import Input from "../../../shared/ui/Input/ui/Input";
import signIn from "../api/signIn";
import { useNavigate } from "react-router-dom";
import './_sign-in.scss'

const SignInForm = ({onLogin}) => {

    const [signInData, setSignInData] = useState({
      email: "",
      password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [response, setResponse] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const navigate = useNavigate();

    console.log(setEmailError, setPasswordError);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSignInData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    };

    const cleanDataFromEmptyStrings = (data) => {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.trim() === '' ? null : value])
      )
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      // let hasError = false;

      for (const [key, value] of Object.entries(signInData)) {
        if (!value.trim()) {
          console.log(key)
          // hasError = true;
          setErrorResponse("Пожалуйста, заполните все обязательные поля");
          return;
        }
      }

      setErrorResponse("");

      signIn(cleanDataFromEmptyStrings(signInData), setResponse, setErrorResponse, onLogin)
    };

    useEffect(() => {
      if(response === 'login successful') {
        navigate(`/homepage`);
      }
    }, [response, navigate])

    return(
      <>
        <form className="sign-in" onSubmit={handleSubmit}>
          <div className="sign-in__input-wrapper">
            <label className="sign-in__label">Электронная почта*</label>
            <Input
              name="email"
              placeholder="Введите почту"
              value={signInData.email}
              onChange={handleInputChange}
              errorMessage={emailError ? true : false}
            />
          </div>
          <div className="sign-in__input-wrapper">
            <label className="sign-in__label">Пароль*</label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Введите пароль"
              value={signInData.password}
              onChange={handleInputChange}
              errorMessage={passwordError ? true : false}
            />
            <button className={`sign-up__password sign-up__password${showPassword ? '--hide' : '--show'}`} type="button" onClick={() => setShowPassword(!showPassword)}>
            <span className="visually-hidden">{showPassword ? 'hide' : 'show'}</span>
          </button>
          </div>
          <div>
            <button className="sign-in__button button button--secondary" type="submit">Войти</button>
          </div>
          {errorResponse && <p className="sign-in__error-message">{errorResponse}</p>}
        </form>
      </>
    )
}
export default SignInForm;
