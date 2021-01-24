import React, { useEffect, useState } from 'react'

import Navbar from './components/Navbar';
import Topbar from './components/Topbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import decode from 'jwt-decode';
import { AuthActionTypes } from './actions/actionTypes/authActionTypes';
import Auth from './components/auth/Auth';

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: AuthActionTypes.LOGOUT });
    history.push('/');
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, // eslint-disable-next-line
    [location]);

  
  
  if (user) {
    return (
      <div className="wrapper">
        <Topbar />
        <Navbar />
        <Content />
        <Footer />
      </div>
    )
  }
  else {
    
    return <Auth />
  }
}

export default App;