import React from 'react';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Login from '../../pages/Login';
import Signin from '../../pages/Signup';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import {checkLogin} from '../../utils/checkLogin'


const index = () => {

  const isLogged = checkLogin();
  
    return (
      <Router>
        <Routes>
          { !isLogged?
              <Route path="/home" element={<Navigate replace to="/login" />} />:
              <Route path="/home" element={<Home />} />
          }
          { !isLogged?
              <Route path="/profile" element={<Navigate replace to="/login" />} />:
              <Route path="/profile" element={<Profile />} />
          }
          { isLogged?
              <Route path="/login" element={<Navigate replace to="/home" />} />:
              <Route path="/login" element={<Login />} />
          }
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Router>
    )
}


export default index;


