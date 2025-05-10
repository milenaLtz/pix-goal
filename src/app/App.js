import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.scss"
import { HomePage } from "../pages/HomePage";
import { GoalPage } from "../pages/GoalPage";
import { SignUpPage } from "../pages/SignUpPage";
import { SignInPage } from "../pages/SignInPage";
import { MainPage } from "../pages/MainPage";

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (token) => {
    setAccessToken(token);
    localStorage.setItem('token', token);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

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
