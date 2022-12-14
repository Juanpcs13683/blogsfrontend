import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ userLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = event => {
        event.preventDefault()
        userLogin({
            username: username,
            password: password,
        })
        setPassword('')
        setUsername('')

    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username <input id='username' type='text' value={username} name='Username' onChange={(({ target }) => setUsername(target.value))} />
                </div>
                <div>
                    password <input id='password' type='password' value={password} name='Password' onChange={(({ target }) => setPassword(target.value))} />
                </div>
                <button id='login-button' type='submit'>login</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    userLogin: PropTypes.func.isRequired
}

export default Login