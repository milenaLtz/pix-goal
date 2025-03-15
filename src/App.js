import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import GoalPage from './pages/goalPage';
import "./App.scss"

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
      {/* <PixiCanvas/> */}
      {/* <DndProvider backend={HTML5Backend}>
        <PixelGrid gridSize={20}/>
      </DndProvider> */}
    </>
  );
}

export default App;
