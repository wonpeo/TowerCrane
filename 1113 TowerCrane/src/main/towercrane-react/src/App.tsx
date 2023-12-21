import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Main from './view/Athentication/Main';
import SignUp from './view/Athentication/SignUp';
import SignIn from './view/Athentication/SignIn';
import Athentication from './view/Athentication';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



export default function App() {
  

  return (
<Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>  );
}
export {};