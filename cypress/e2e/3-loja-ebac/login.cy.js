/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer o login com sucesso', () => {
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

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, conta-testes-ebac (não é conta-testes-ebac? Sair)')
    });

    it.only('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, conta-testes-ebac (não é conta-testes-ebac? Sair)')
        })
    });
})