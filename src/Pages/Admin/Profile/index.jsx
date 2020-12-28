import React from 'react'
import './style.scss'

const Profile = ({ user, setUser }) => {

    const logout = () => {
        setUser(null)
        sessionStorage.removeItem("user")
    }

    return (
        <div className="profile_container">
            <div className="box">
                <div className="title">
                    <span>Profile page</span>
                    <button onClick={() => logout()}>Logout</button>
                </div>
                <div className="user">
                    <b>username :</b> {user.username} <br />
                    <b>email :</b> {user.email} <br />
                    <b>admin :</b> {user.admin === 1 ? 'True' : 'False'} <br />

                    {user.admin === 1 && <small><br />"You can now go to schedule section and update content."</small>}
                </div>
            </div>
        </div>
    )
}

export default Profile