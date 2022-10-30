import React from "react";
import blogs from "../services/blogs";

const Blog = ({blogs}) =>{ 
    return(
    <div>
        {blogs.map(blog => <p key={ blog.id } >{blog.title}  <b>{blog.author}</b></p>)}
    </div>
)}

export default Blog