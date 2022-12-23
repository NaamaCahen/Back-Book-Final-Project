import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myBooks' element={<Login/>}/>
          <Route path='/search' element={<Login/>}/>
          <Route path='/logout' element={<Login/>}/>
          <Route path='/profile' element={<Login/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
