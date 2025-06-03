import { useState, useEffect } from "react";
import Input from "../../../shared/ui/Input/ui/Input";
import './_sign-up.scss'
import signUp from "../api/signUp";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {

  const [signUpData, setSignUpData] = useState({
    userName: "",
    userSurname: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDuplicatePassword, setShowDuplicatePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [secondPasswordError, setSecondPasswordError] = useState(null);
  const [response, setResponse] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[@$!%*?&])[A-ZА-Яa-zа-я\d@$!%*?&]{8,}$/;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    if (name === "password") {
      setPasswordError(passwordRegex.test(value) ? null : "Пароль должен содержать минимум 8 символов, заглавную и строчную букву, число и спецсимвол");
    }

    if (name === "email") {
      setEmailError(emailRegex.test(value) ? null : "Некорректный email");
    }
  };

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value);

    if (!passwordRegex.test(event.target.value)) {
      setSecondPasswordError("Пароль должен содержать минимум 8 символов, заглавную и строчную букву, число и спецсимвол");
    } else if (
      (event.target.value !== signUpData.password)
    ) {
      setSecondPasswordError("Пароли не совпадают");
    } else {
      setSecondPasswordError(null);
    }
  };

  const cleanDataFromEmptyStrings = (data) => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim() === '' ? null : value])
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(signUpData)) {
      if (!value.trim()) {
        setErrorResponse("Пожалуйста, заполните все обязательные поля");
        return;
      }
    }

    if (!password.trim()) {
      setErrorResponse("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (emailError || passwordError || secondPasswordError) {
      setErrorResponse("Исправьте ошибки перед отправкой формы");
      return;
    }

    if (signUpData.password !== password) {
      setSecondPasswordError("Пароли не совпадают");
      setErrorResponse("Пароли не совпадают");
      return;
    }

    setErrorResponse("");

    signUp(cleanDataFromEmptyStrings(signUpData), setResponse, setErrorResponse)
  };

  useEffect(() => {
    if(response === 'sign up successful') {
      navigate(`/sign-in`);
    }
  }, [response, navigate])

  return(
    <>
      <form className="sign-up" onSubmit={handleSubmit}>
        <div className="sign-up__input-wrapper">
          <label className="sign-up__label">Имя*</label>
          <Input
            name="userName"
            placeholder="Введите имя"
            value={signUpData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="sign-up__input-wrapper">
          <label className="sign-up__label">Фамилия*</label>
          <Input
            name="userSurname"
            placeholder="Введите фамилию"
            value={signUpData.userSurname}
            onChange={handleInputChange}
          />
        </div>
        <div className="sign-up__input-wrapper">
          <label className="sign-up__label">Электронная почта*</label>
          <Input
            name="email"
            placeholder="Введите почту"
            value={signUpData.email}
            onChange={handleInputChange}
            errorMessage={emailError ? true : false}
          />
           {emailError && <p className="sign-up__error-message">{emailError}</p>}
        </div>
        <div className="sign-up__input-wrapper">
          <label className="sign-up__label">Пароль*</label>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Введите пароль"
            value={signUpData.password}
            onChange={handleInputChange}
            errorMessage={passwordError ? true : false}
          />
          <button className={`sign-up__password sign-up__password${showPassword ? '--hide' : '--show'}`} type="button" onClick={() => setShowPassword(!showPassword)}>
            <span className="visually-hidden">{showPassword ? 'hide' : 'show'}</span>
          </button>
          {passwordError && <p className="sign-up__error-message">{passwordError}</p>}
        </div>
        <div className="sign-up__input-wrapper">
          <label className="sign-up__label">Повторите пароль*</label>
          <Input
            type={showDuplicatePassword ? "text" : "password"}
            name="password"
            placeholder="Повторите пароль"
            value={password}
            onChange={handleInputPasswordChange}
            errorMessage={secondPasswordError ? true : false}
          />
          <button className={`sign-up__password sign-up__password${showDuplicatePassword ? '--hide' : '--show'}`} type="button" onClick={() => setShowDuplicatePassword(!showDuplicatePassword)}>
            <span className="visually-hidden">{showDuplicatePassword ? 'hide' : 'show'}</span>
          </button>
          {secondPasswordError && <p className="sign-up__error-message">{secondPasswordError}</p>}
        </div>
        <div>
          <button className="sign-up__button button button--secondary" type="submit">Зарегистрироваться</button>
        </div>
        {errorResponse && <p className="error">{errorResponse}</p>}
      </form>
    </>
  )
}
export default SignUpForm;
