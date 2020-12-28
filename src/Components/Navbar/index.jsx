import React from 'react'
import './style.scss'

import { NavLink } from 'react-router-dom'
import { FaCalendar, FaUserAlt, FaSignInAlt } from 'react-icons/fa';


export default function index() {
    return (
        <div className="navbar_container">
            <NavLink to="/">EM</NavLink>
            <div>
                <NavLink activeClassName="active" to="/schedule"><FaCalendar /></NavLink>
                <NavLink activeClassName="active" to="/authors"><FaUserAlt /></NavLink>
                <NavLink activeClassName="active" to="/admin"><FaSignInAlt /></NavLink>
            </div>
        </div>
    )
}
