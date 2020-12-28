import React, { useState } from 'react'
import swal from 'sweetalert';
import './style.scss'

import axios from 'axios';
import api_url from '../../../Service/api';

const Login = ({ setUser }) => {
    const [ credentials, setCredentials ] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.value){
            setCredentials(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    const login = () => {
        if(credentials.email !== "" && credentials.password !== ""){
            axios.post(api_url + '/user/login', JSON.stringify(credentials)).then((resp) => {
                if(resp && resp.data){
                    setUser(resp.data)
                }
            }).catch(err => {
                let message = "We couldn't log you in";
                if (err.response && err.response.data){
                    message = err.response.data
                }
                swal("Ops", message, "error")
            })
        } else {
            swal("Form Error", "Please fill email and password correctly", "error")
        }
    }

    return (
        <div className="login_container">
            <div className="form">
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                <button onClick={() => login()}>Login</button>
            </div>
        </div>
    )
}

export default Login
