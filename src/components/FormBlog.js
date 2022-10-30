import React, { useState } from "react";

const FormBlog = ({ createBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = event => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
          })

          setTitle('')
          setAuthor('')
          setUrl('')
    }
    return(
    <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
            <div>
                title:<input type="text" value={title} name="Title"  onChange={({ target }) => setTitle(target.value)} required/>
            </div>
            <div>
                author:<input type="text" value={author} name="Author"  onChange={({ target }) => setAuthor(target.value)} required/>
            </div>
            <div>
                url:<input type="text" value={url} name="Url"  onChange={({ target }) => setUrl(target.value)} required/>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)}

export default FormBlog