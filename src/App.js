import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import FormBlog from './components/FormBlog'
import LogOut from './components/LogOut'
import Togglable from './components/Toggleable'

function App() {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)
  const [classMessage, setClassMessage] = useState(null)
  //loggin variables
  const [user, setUser] = useState(null)


  //-------Getting all the blogs in DB
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  //---------Saving the user logged

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userLogin) => {

    let username = userLogin.username
    let password = userLogin.password

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setMessage('user logged in successful')
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)

    } catch (error) {
      //set the error
      setMessage(error.response.data.error)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setMessage('log out successful')
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 3000)
    } catch (error) {
      setMessage(error.response.data.error)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 3000)
    }
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService.create(blogObject).then(response => {
      setBlogs(blogs.concat(response))
      setMessage(`a new blog ${response.title} by ${response.author} added`)
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 4000)
    }).catch(error => {
      setMessage(error.response.data.error)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 4000)
    }
    )

  }

  const updateBlog = (blogObject, idBlog) => {
    blogService.update(blogObject, idBlog).then(response => {
      setBlogs(blogs.map(blog => blog.id !== idBlog ? blog : response))
      setMessage('User updated')
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 4000)
    }).catch(error => {
      setMessage(error.response.data.error)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 4000)
    })
  }

  const deleteBlog = (idBlog) => {

    const blogFound = blogs.find(blog => blog.id === idBlog)
    if (window.confirm(`Remove blog ${blogFound.title} by ${blogFound.author}`)) {
      blogService.delet(idBlog).then(() => {
        setBlogs(blogs.filter(blog => blog.id !== idBlog))
        setMessage('Blog have been deleted')
        setClassMessage('success')
        setTimeout(() => {
          setMessage(null)
          setClassMessage(null)
        }, 4000)
      }).catch(error => {
        setMessage(error.response.data.error)
        setClassMessage('error')
        setTimeout(() => {
          setMessage(null)
          setClassMessage(null)
        }, 4000)
      })
    }
  }

  const loginComponent = () => (
    <Togglable buttonLabel='login'>
      <Login userLogin={handleLogin} />
    </Togglable>
  )


  const blogFormRef = useRef()


  const blogsComponent = () => (
    <div>
      <h2>Blogs</h2>
      <LogOut user={user} handleLogOut={handleLogOut} />
      <Togglable buttonLabel='new Blog' ref={blogFormRef}>
        <FormBlog createBlog={addBlog} />
      </Togglable>
      <br />
      <Blog updatedBlog={updateBlog} blogs={blogs} handleDelete={deleteBlog} />
    </div>
  )

  return (
    <div className='App'>
      <Notification message={message} classNotification={classMessage} />
      {user === null ? loginComponent() : blogsComponent()}
    </div>
  )
}

// set display name
App.displayName = 'MyApp'

export default App
