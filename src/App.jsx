import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home'
import './css/styles.css';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Landing/>}></Route>
        <Route path ='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
  
};

export default App;
