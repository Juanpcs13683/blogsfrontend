import React, { useState } from 'react'

const FormBlog = ({ createBlog }) => {

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
    <div className='formDiv'>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
            <div>
                title:<input id='title' type="text" value={title} name="Title"  onChange={({ target }) => setTitle(target.value)} placeholder='title' required/>
            </div>
            <div>
                author:<input id='author' type="text" value={author} name="Author"  onChange={({ target }) => setAuthor(target.value)} placeholder='author' required/>
            </div>
            <div>
                url:<input id='url' type="text" value={url} name="Url"  onChange={({ target }) => setUrl(target.value)} placeholder='url' required/>
            </div>
            <button id='save-button' type="submit">create</button>
        </form>
    </div>
)}

export default FormBlog