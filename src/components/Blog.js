import React from "react";
import blogs from "../services/blogs";
import ToggleableBlog from "./ToggleableBlog";

const Blog = ({blogs}) =>{ 

    
    return(
    <div>
        {blogs.map(blog => 
        <ToggleableBlog key={blog.id} 
        title={blog.title} 
        author={blog.author} 
        url={blog.url} 
        likes={blog.likes} 
        user={blog.user.name}>
        </ToggleableBlog>)}
    </div>
)}

export default Blog