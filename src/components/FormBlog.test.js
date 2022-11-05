import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FormBlog from './FormBlog'
import userEvent from '@testing-library/user-event'

test('<FormBlog/> calls the handler for create with the right information', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
  
    render(<FormBlog createBlog={createBlog} />)
  
    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    
    const sendButton = screen.getByText('create')
  
    await user.type(title, 'testing a form...')
    await user.type(author, 'Juanpcs13683')
    await user.type(url, 'www.something.com')
    screen.debug( title)
    screen.debug(author)
    screen.debug(url)

    await user.click(sendButton)
    expect(createBlog.mock.calls).toHaveLength(1)
  })