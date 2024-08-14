/// <reference types="cypress"/>

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            //.first()
            //.last()
            //.eq(2)
            .contains('Arcadio Gym Short')
            .click()
        cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Arcadio Gym Short')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            .first()
            //.last()
            //.eq(2)
            //.contains('Ariel Roll Sleeve Sweatshirt')
            .click()
        cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Abominable Hoodie')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            //.first()
            .last()
            //.eq(2)
            //.contains('Ariel Roll Sleeve Sweatshirt')
            .click()
        cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Atlas Fitness Tank')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            //.first()
            //.last()
            .eq(2)
            //.contains('Ariel Roll Sleeve Sweatshirt')
            .click()
            cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Aether Gym Pant')
    });

    
});