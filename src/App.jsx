import React from 'react'
import './App.css'
import { BrowserRouter , Routes,Route } from 'react-router-dom'
import TaskList from './pages/TaskList'
import TaskAdd from './pages/TaskAdd'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TaskList/>} />
      <Route path="/taskadd" element={<TaskAdd/>} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App