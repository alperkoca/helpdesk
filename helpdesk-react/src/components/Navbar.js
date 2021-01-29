import React from 'react'
import ActiveLink from './ActiveLink';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { AuthActionTypes } from '../actions/actionTypes/authActionTypes';

const Navbar = () => {
  document.body.className = "sidebar-mini";

  const history = useHistory();
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch({ type: AuthActionTypes.LOGOUT });
    history.push('/');
    return;
  }

  const user = JSON.parse(localStorage.getItem('profile'))?.result?.user;

  return <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="/" className="brand-link">
      <img src={process.env.PUBLIC_URL + "/img/logo128.png"} alt="Helpdesk Logo" className="brand-image img-circle elevation-3" />
      <span className="brand-text font-weight-light">Helpdesk</span>
    </a>
    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="https://picsum.photos/160/160" className="img-circle elevation-2" alt="User" />
        </div>
        <div className="info">
          <button onClick={Logout} className="d-block btn" style={{color:"#c2c7d0"}}>{user?.firstLastName}</button>
        </div>
      </div>
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
          <li className="nav-item">
            <ActiveLink to="/tickets/create" className="nav-link">
              <i className="nav-icon far fa-plus-square"></i>
              <p>
                Create Ticket
                  </p>
            </ActiveLink>
          </li>
          <li className="nav-item">
            <ActiveLink to="/tickets" className="nav-link">
              <i className="nav-icon fas fa-tasks"></i>
              <p>
                Ticket List
                  </p>
            </ActiveLink>
          </li>
          <li className="nav-item">
            <ActiveLink to="/category" className="nav-link">
              <i className="nav-icon fas fa-list"></i>
              <p>
                Categories
                  </p>
            </ActiveLink>
          </li>
          <li className="nav-item">
          <Link to="/users" className="nav-link">
              <i className="nav-icon fas fa-users"></i>
              <p>
                Users
                  </p>
            </Link>
          </li>
          <li className="nav-item">
              <Link to="/status" className="nav-link">
              <i className="nav-icon fas fa-info"></i>
              <p>
                Ticket Statuses
                  </p>
                  </Link>
            
          </li>
          <li className="nav-item">
          <Link to="/priority" className="nav-link">
              <i className="nav-icon fas fa-signal"></i>
              <p>
                Ticket Priorities
                  </p>
            </Link>
          </li>
        </ul>
      </nav>

    </div>

  </aside>
}


export default Navbar;