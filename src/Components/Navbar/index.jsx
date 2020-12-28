import React from 'react'
import './style.scss'

import { NavLink } from 'react-router-dom'
import { FaCalendar, FaUserAlt, FaTrophy, FaSignInAlt } from 'react-icons/fa';


export default function index() {
    return (
        <div className="navbar_container">
            <span>EM</span>
            <div>
                <NavLink activeClassName="active" to="/events"><FaCalendar /></NavLink>
                <NavLink activeClassName="active" to="/authors"><FaUserAlt /></NavLink>
                <NavLink activeClassName="active" to="/auth"><FaSignInAlt /></NavLink>
            </div>
        </div>
    )
}
