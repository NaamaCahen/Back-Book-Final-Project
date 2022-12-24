import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Auth from './authentication/Auth';
import Search from './components/Search';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/home' element={<Auth><Home/></Auth>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myBooks' element={<Login/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/logout' element={<Login/>}/>
          <Route path='/profile' element={<Login/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
