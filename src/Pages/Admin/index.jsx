import React, { useState, useEffect } from 'react'
import './style.scss'

import Login from './Login';
import Profile from './Profile';

const Admin = () => {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user))
        } else {
            let cache = JSON.parse(sessionStorage.getItem("user"))
            setUser(cache)
        }
    }, [user])

    return (
        <div className="admin_container" style={{ height: window.innerHeight - 100 }}>
            {user ? <Profile user={user} setUser={setUser} /> : <Login setUser={setUser} />}
        </div>
    )
}

export default Admin;
