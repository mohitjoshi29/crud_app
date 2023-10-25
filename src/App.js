import React from 'react'
import CrdTask from './CrdTask/CrdTask'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Emp_Form from './Emp_Form/Emp_Form'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CrdTask/>}></Route>
        <Route path='/company/:id' element={<Emp_Form/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
