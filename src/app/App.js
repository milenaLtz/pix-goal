import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.scss"
import { HomePage } from "../pages/HomePage";
import { GoalPage } from "../pages/GoalPage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/homePage' element={<HomePage/>}/>
          <Route path='/goalPage/1' element={<GoalPage/>}/>
          <Route path="/goalPage/:id" component={<GoalPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
