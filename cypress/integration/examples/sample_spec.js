describe('My First Test', () => {
  it('Visits the swapskills', () => {
    cy.visit('http://localhost:3001/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.get('.welcome_').contains('submit the form!')
      .type('marion@gmail.com')
      .should('have.value', 'marion@gmail.com');
  });
});
