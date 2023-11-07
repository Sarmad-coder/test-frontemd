import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/login';
import Dashboard from './Pages/Dashboard/dashboard';
function App() {


  return (
    <BrowserRouter>
      <ToastContainer/>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />




      </Routes>

    </BrowserRouter>
  );
}

export default App;
