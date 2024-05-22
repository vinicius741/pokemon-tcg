describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=500', {
      fixture: 'pokemonCards.json'
    }).as('getPokemonCards');
  });

  it('should display the search input and a Pokémon card', () => {
    cy.visit('http://localhost:5173/');

    cy.wait('@getPokemonCards');

    cy.get('input[placeholder="Search by name"]').should('be.visible');

    cy.contains('Venusaur-EX').should('be.visible');
  });

  it('should navigate to detail page when Pokémon card is clicked', () => {
    cy.visit('http://localhost:5173/');

    cy.wait('@getPokemonCards');

    cy.contains('Venusaur-EX').click();

    cy.url().should('include', '/details/xy1-1');
    cy.contains('ID: xy1-1').should('be.visible');
    cy.contains('Type: Grass').should('be.visible');
  });
});
