import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.scss"
import { HomePage } from "../pages/HomePage";
import { GoalPage } from "../pages/GoalPage";
import { SignUpPage } from "../pages/SignUpPage";
import { SignInPage } from "../pages/SignInPage";
import { MainPage } from "../pages/MainPage";
import checkTokenExpiry from "./lib/checkTokenExpiry";

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('token') || '');
  const [isTokenValid, setIsTokenValid] = useState(false);
  console.log(isTokenValid)
  const handleLogin = (token) => {
    setAccessToken(token);
    localStorage.setItem('token', token);
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Здесь можно добавить проверку валидности токена
      // Например, проверить его срок действия или отправить запрос на сервер
      // Для примера просто проверяем наличие токена
      checkTokenExpiry();
      setAccessToken(token);
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, []);

  // Функция для проверки защищенных роутов
  // const ProtectedRoute = ({ children }) => {
  //   if (!isTokenValid) {
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage/>} />
          <Route path='/homePage' element={accessToken ? <HomePage accessToken={accessToken}/> : <SignInPage onLogin={handleLogin}/>}/>
          <Route path="/goalPage/:id" element={accessToken ? <GoalPage accessToken={accessToken}/> : <SignInPage onLogin={handleLogin}/>} />
          <Route path='/sign-up' element={<SignUpPage onLogin={handleLogin}/>}/>
          <Route path='/sign-in' element={<SignInPage onLogin={handleLogin}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
