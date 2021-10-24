import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css'
import './styles/button.css'
// import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
 
export default function Navbar() {
  return (
    <div className="navContainer">

        
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="title">
          <NavLink className="navbar-brand" to="/">
            Driver Assignment App
          </NavLink>
        </div>

        <div>
            <NavLink className="nav-link" to="/create">
            <button className="createNewRecordButton"><FontAwesomeIcon icon={faPlus}/> &nbsp;Add record </button>
              </NavLink>
        </div>
      </nav>

    </div>
  );
};
 