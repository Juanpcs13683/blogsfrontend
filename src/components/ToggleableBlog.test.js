import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleableBlog from './ToggleableBlog'

describe('<ToggleableBlog />', () => {
    let container

    const blog = {
        title:'testing a blog',
        author: 'Juanpcs13683',
        url: 'www.blogs.com.co',
        likes: 1,
    }
    
    const user = {username: 'admin', name: 'admin', id: '6358ffd3e6c7f50e5dc761e6'}
    
    const mockHandler = jest.fn()

    beforeEach(() => {
        

        container = render(
        <ToggleableBlog title={blog.title} 
        author={blog.author} url={blog.url} likes={blog.likes} user={user} updatedBlog={mockHandler} /> 
        
        ).container
       

    })

   //Exercises 5.13 

    test('rendering a blog without pressing a button for details', () => {
        const element = screen.getAllByText('testing a blog')
        expect(element).toBeDefined()
       // screen.debug(element)
    })

    test('when button is not clicked yet the info are not displayed', () => {
        const div = container.querySelector('.toggleableContent')
        expect(div).toHaveStyle('display: none')
       // screen.debug(div)
    })

    //Exercise 5.14
    test('after clicking the button, blog`s url and nunber of likes are show',async () => {
        const user = userEvent.setup()
        const button  = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.toggleableContent')
        //expect(div).not.toHaveStyle('display: none')
        //const url = await screen.findByText('www.blogs.com.co')
        //expect(url).toBeDefined()
        const likes = screen.getByText('likes: 1', { exact: false })
        screen.debug(likes)
    })

    //Exercise 5.15
    test('if like button is clicked twice, the handler will be called twice',async () => {
        const user = userEvent.setup()

        

        const buttonView = screen.getByText('view')
        await user.click(buttonView)
        const likes = screen.getByText('likes:', {exact: false })
        const likeButotn = screen.getByText('like')
        await user.click(likeButotn)
        await user.click(likeButotn)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
    
})