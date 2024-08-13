/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('Conta-Testes-Ebac@testemail.com')
        cy.get('#password').type('Senhaparateste123*')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, conta-testes-ebac (não é conta-testes-ebac? Sair)')
    })

    it('Deve exibir uma mensaguem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Conta-Testes@testemail.com')
        cy.get('#password').type('Senhaparateste123*')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensaguem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('Conta-Testes-Ebac@testemail.com')
        cy.get('#password').type('Senhaparateste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail Conta-Testes-Ebac@testemail.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
    });
})