import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])

  //loggin variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //-------Getting all the blogs in DB
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])
  //---------Saving the user logged

  const blogsComponent = () => (
    <div>
     
      <Blog blogs={blogs} />
    </div>
  )

  return (
    <div className="App">
      
      
    </div>
  );
}

export default App;
