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
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
    })

    it('Deve exibir uma mensaguem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Conta-Testes@testemail.com')
        cy.get('#password').type('Senhaparateste123*')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });

    it('Deve exibir uma mensaguem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('Conta-Testes-Ebac@testemail.com')
        cy.get('#password').type('Senhaparateste123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail Conta-Testes-Ebac@testemail.com está incorreta. Perdeu a senha?')
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
        })
    });

    it('Deve fazer login com sucesso - Usando Comandos customizados', () => {
        cy.login('Conta-Testes-Ebac@testemail.com', 'Senhaparateste123*')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
    });
})