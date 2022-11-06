describe('Blog app', function() {

    Cypress.Commands.add('login', ({ username, password }) => {
        cy.request('POST', 'http://localhost:3003/api/login', {
          username, password
        }).then(({ body }) => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
          cy.visit('http://localhost:3000')
        })
      })

    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
  
    //Exercise 5.17
    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    //Exercise 5.18
    describe('Login', function () {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                name: 'admin',
                username: 'admin',
                password: 'admin'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.visit('http://localhost:3000')
        })


        it('succeeds with correct credentials', function(){
            cy.contains('login').click()
            cy.get('#username').type('admin')
            cy.get('#password').type('admin')
            cy.get('#login-button').click()
        })

        it('fails with the wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('admin')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')

            cy.get('.error').should('contain', 'invalid username or password') 
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')

        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'admin', password: 'admin' })
        })

        it('a new note can be created', function () {
            cy.contains('new Blog').click()
            cy.get('#title').type('new blog to test')
            cy.get('#author').type('juanpcs')
            cy.get('#url').type('www.something.com')
            cy.get('#save-button').click()
            cy.contains('new blog to test')
        })

        // Exercise 5.20
        it('the user can like a blog', function () {
            cy.contains('view').click()
            cy.get('#like-button').click()
            cy.get('.success').should('contain', 'Blog updated')
        })

        //Exercise 5.21 user can delete
        it('the user can delete a blog', function () {
            cy.contains('view').click()
            cy.get('#delete-button').click()
            cy.get('.success').should('contain', 'Blog have been deleted')
        })
    })

    describe('blogs are ordered by likes number', function() {
        Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
            cy.request({
                url: 'http://localhost:3003/api/blogs',
                method: 'POST',
                body: { title, author, url, likes },
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
                }
                })
                cy.visit('http://localhost:3000')
        })

        beforeEach(function () {
            cy.login({ username: 'admin', password: 'admin' })
            cy.createBlog({title: 'first Blog', author: 'Juanpcs', url: 'www.something.com', likes: 4})
            cy.createBlog({title: 'second Blog', author: 'Juanpcs', url: 'www.something.com', likes: 9})
            cy.createBlog({title: 'third Blog', author: 'Juanpcs', url: 'www.something.com', likes: 2})
        })

        it('blogs are ordered by likes number', function () {
            cy.get('.blog').eq(0).should('contain', 'second Blog')
            cy.get('.blog').eq(1).should('contain', 'first Blog')
            cy.get('.blog').eq(2).should('contain', 'third Blog')
        })
    })
  })