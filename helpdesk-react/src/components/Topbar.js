import React, { Component } from 'react'

class Topbar extends Component {
    toggleSidebar = () => {
        if (document.body.classList.contains("sidebar-collapse")) {
          document.body.classList.remove("sidebar-collapse");
        }
        else {
          document.body.classList.add("sidebar-collapse");
        }
      }
    render() {
        return <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => this.toggleSidebar()}>
                        <i className="fas fa-bars"></i>
                    </button>
                </li>
            </ul>
        </nav>
    }
}


export default Topbar;