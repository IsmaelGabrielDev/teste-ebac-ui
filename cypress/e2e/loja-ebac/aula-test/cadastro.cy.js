/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Cadastro', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    
    it('Cadastro com sucesso', () => {
        //faker.internet.email() gera um email aleatorio
        cy.get('#reg_email').type(faker.internet.email())
        //faker.internet.password() gera uma senha aleatoria
        cy.get('#reg_password').type(faker.internet.password())
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        //faker.person.firstName() gera um nome aleatorio
        cy.get('#account_first_name').type(faker.person.firstName())
        //faker.person.lastName() gera um sobrenome aleatorio
        cy.get('#account_last_name').type(faker.person.lastName())
        //wait para aguardar 5 segundos, não é uma boa pratica manter no teste
        //cy.wait(5000)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain' , 'Detalhes da conta modificados com sucesso.')
    });

    it('Cadastro com sucesso - Usando variaveis', () => {
        var nome = faker.person.firstName()
        var email = faker.internet.email(nome)
        var senha = faker.internet.password()
        var sobrenome = faker.person.lastName()
        
        //faker.internet.email() gera um email aleatorio
        cy.get('#reg_email').type(email)
        //faker.internet.password() gera uma senha aleatoria
        cy.get('#reg_password').type(senha)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        //faker.person.firstName() gera um nome aleatorio
        cy.get('#account_first_name').type(nome)
        //faker.person.lastName() gera um sobrenome aleatorio
        cy.get('#account_last_name').type(sobrenome)
        //wait para aguardar 5 segundos, não é uma boa pratica manter no teste
        //cy.wait(5000)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain' , 'Detalhes da conta modificados com sucesso.')
    });

    it('Cadastro com sucesso - Usando comando customizado', () => {
        cy.preCadastro(faker.internet.email(), faker.internet.password(), faker.person.firstName(), faker.person.lastName())
        cy.get('.woocommerce-message').should('contain' , 'Detalhes da conta modificados com sucesso.')
    });
});