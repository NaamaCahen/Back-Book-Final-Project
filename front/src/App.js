import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/myBooks' element={<Login/>}/>
          <Route path='/search' element={<Login/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
