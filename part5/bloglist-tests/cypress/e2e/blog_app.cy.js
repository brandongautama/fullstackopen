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
});
