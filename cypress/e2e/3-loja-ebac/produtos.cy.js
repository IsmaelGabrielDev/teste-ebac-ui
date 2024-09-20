/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        
        produtosPage.visitarUrl()
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
        cy.get('#tab-description > :nth-child(1)').should('contain' , 'Need an everyday action tee that helps keep you dry? The Aero Daily Fitness Tee is made of 100% polyester wicking knit that funnels moisture away from your skin.')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block').first().click()
        cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Abominable Hoodie')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block').last().click()
        cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Atlas Fitness Tank')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block').eq(2).click()
        cy.get('.woocommerce-product-details__short-description > p').should('contain' , 'This is a variable product called a Aether Gym Pant')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Cassia Funnel Sweatshirt'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain' , produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Argus All Weather Tank')
        cy.get('.product_title').should('contain' , 'Argus All-Weather Tank')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 4
        produtosPage.buscarProduto('Balboa Persistence Tee')
        cy.wait(50)
        produtosPage.addProdutoCarrinho('M', 'Gray', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Balboa Persistence Tee” foram adicionados no seu carrinho.')
    });

    it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[0].nomeProduto) 
            cy.wait(50)
            produtosPage.addProdutoCarrinho(dados[0].tamanho, dados[0].cor, dados[0].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
        })
    });

    
});