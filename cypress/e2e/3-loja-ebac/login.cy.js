/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('Conta-Testes-Ebac@testemail.com')
        cy.get('#password').type('Senhaparateste123*')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, conta-testes-ebac (não é conta-testes-ebac? Sair)')
    })
})