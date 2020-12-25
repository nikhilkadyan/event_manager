import React from 'react'
import './style.scss'

import { NavLink } from 'react-router-dom'

export default function index() {
    return (
        <div className="navbar_container">
            <span>EM</span>
            <div>
                <NavLink activeClassName="active" to="/events">Events</NavLink>
                <NavLink activeClassName="active" to="/authors">Authors</NavLink>
                <NavLink activeClassName="active" to="/awards">Awards</NavLink>
                <NavLink activeClassName="active" to="/auth">Auth</NavLink>
            </div>
        </div>
    )
}
