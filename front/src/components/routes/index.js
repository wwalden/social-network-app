import React from 'react';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Login from '../../pages/Login';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';


const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  )
}


export default index;
