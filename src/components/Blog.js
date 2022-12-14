import React from 'react'
import ToggleableBlog from './ToggleableBlog'

const Blog = ({ blogs, updatedBlog, handleDelete }) => {
    return(
    <div>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog => 
        <ToggleableBlog key={blog.id} 
        title={blog.title} 
        author={blog.author} 
        url={blog.url} 
        likes={blog.likes} 
        user={blog.user}
        idBlog={blog.id}
        updatedBlog={updatedBlog}
        handleDelete={handleDelete}>
        
        </ToggleableBlog>)}
    </div>
)}


export default Blog