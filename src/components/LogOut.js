import React from 'react'

const LogOut = ({ user, handleLogOut }) => (
    <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
)

export default LogOut