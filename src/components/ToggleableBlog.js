import React, { useState } from "react"

const ToggleableBlog = ({ title, author, url, likes, user }) => {
    const  [visible, setVisible] = useState(false)

    const hidenWhenVisible = { display : visible ? 'none': '' }
    const showWhenVisible = { display : visible ? '' : 'none' }

    const toggleVisibility = () => {setVisible(!visible)}

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    return(
        <div style={blogStyle}>
            <div style={hidenWhenVisible}>
                {title} <b>{author}</b> <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible}>
                {title} <b>{author}</b> <button onClick={toggleVisibility}>hide</button>
                <p>{url}</p>
                <p>likes: {likes} <button>like</button></p>
                <p>{user}</p>
            </div>
        </div>
    )
}

export default ToggleableBlog