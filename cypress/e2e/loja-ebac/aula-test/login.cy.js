/// <reference types="cypress" />
//require para importar o arquivo
const perfil = require('../../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    //before para executar antes de cada teste
    //beforeEach para executar antes de todos os testes
    beforeEach(() => {
        //visit para acessar o site
        cy.visit('minha-conta')
    })

    //after para executar depois de cada teste
    //afterEach para executar depois de todos os testes
    afterEach(() => {
        //screenshot para tirar uma foto
        cy.screenshot()
    })
    it('Deve fazer login com sucesso', () => {
        //get para pegar o elemento
        cy.get('#username').type('Conta-Testes-Ebac@testemail.com')
        //type para inserir o texto
        cy.get('#password').type('Senhaparateste123*')
        //check para marcar o checkbox
        cy.get('#rememberme').check()
        //click para clicar no botão
        cy.get('.woocommerce-form > .button').click()
        //should para validar o texto  
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
    })

    //.only para executar apenas esse teste
    it('Deve exibir uma mensaguem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Conta-Testes@testemail.com')
        cy.get('#password').type('Senhaparateste123*')
        cy.get('#rememberme').check()
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido.')
    })

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {
        cy.get('#username').type('Conta-Testes-Ebac@testemail.com')
        cy.get('#password').type('Senhaparateste12')
        cy.get('#rememberme').check()
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail Conta-Testes-Ebac@testemail.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve fazer login utilizando massa de dados', () => {
        //puxando os dados da importação
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('#rememberme').check()
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
    });

    it('Deve fazer login utilizando fixture', () => {
        //puxando os dados do fixture
        cy.fixture('perfil').then(dados => {
            //log: false para nao exibir os dados do usuario
            cy.get('#username').type(dados.usuario), {log: false}
            //log: false para nao exibir os dados da senha
            cy.get('#password').type(dados.senha), {log: false}
            cy.get('#rememberme').check()
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
        })
    });

    it.only('Deve fazer login utilizando Comandos customizados', () => {
        //.login para puxar o comando customizado
        cy.login('Conta-Testes-Ebac@testemail.com', 'Senhaparateste123*')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, Ismael QA (não é Ismael QA? Sair)')
    });
})