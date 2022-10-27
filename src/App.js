import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)
  const [classMessage, setClassMessage] = useState(null)
  

  //loggin variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('user logged in successful')
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000);

    } catch (error) {
      //set the error
      setMessage(error.message)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000);
    }
  }

  const handleLogOut = async() => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setMessage('log out successful')
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 3000);
    } catch (error) {
      setMessage(error.message)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 3000);
    }
  }

  const loginComponent = () => (
    <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
  )

  const blogsComponent = () => (
    <div>
     
      <Blog blogs={blogs} user={user} handleLogOut={handleLogOut} />
    </div>
  )

  return (
    <div className="App">
      <Notification message={message} classNotification={classMessage} />
      {user === null? loginComponent() : blogsComponent()}
    </div>
  );
}

export default App;
