describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const rootUser = {
      name: 'root',
      username: 'root',
      password: 'sekret',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', rootUser);
    const user = {
      name: 'test',
      username: 'test',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function () {
    cy.contains('blog');
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  it('user can log in', function () {
    cy.get('#username').type('test');
    cy.get('#password').type('test');
    cy.get('#login-button').click();

    cy.contains('test logged-in');
  });

  it('login fails with wrong password', function () {
    cy.get('#username').type('test');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'ERROR: Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'test logged-in');
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      const blog = {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      };
      cy.get('#show-togglable-button').click();
      cy.get('#title').type(blog.title);
      cy.get('#author').type(blog.author);
      cy.get('#url').type(blog.url);
      cy.get('#submit-button').click();

      cy.contains(blog.title);
      cy.contains(blog.author);
    });
  });

  describe('When logged in and blogs created', function () {
    beforeEach(function () {
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-button').click();

      let blog = {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      };
      cy.get('#show-togglable-button').click();
      cy.get('#title').type(blog.title);
      cy.get('#author').type(blog.author);
      cy.get('#url').type(blog.url);
      cy.get('#submit-button').click();

      blog = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      };
      cy.get('#show-togglable-button').click();
      cy.get('#title').type(blog.title);
      cy.get('#author').type(blog.author);
      cy.get('#url').type(blog.url);
      cy.get('#submit-button').click();

      blog = {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      };
      cy.get('#show-togglable-button').click();
      cy.get('#title').type(blog.title);
      cy.get('#author').type(blog.author);
      cy.get('#url').type(blog.url);
      cy.get('#submit-button').click();

      blog = {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
      };
      cy.get('#show-togglable-button').click();
      cy.get('#title').type(blog.title);
      cy.get('#author').type(blog.author);
      cy.get('#url').type(blog.url);
      cy.get('#submit-button').click();
    });

    it('A blog can be liked', function () {
      cy.get('#show-details-button').click();
      cy.get('#like-button:first').click();
      cy.contains(1);
    });
  });
});

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];
