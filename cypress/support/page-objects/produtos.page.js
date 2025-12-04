class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos/')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }
    
    buscarProdutoLista(nomeProduto) {
        cy.get('.product-block').contains(nomeProduto).click()
    }
    
    visitarProduto(nomeProduto) {
        //cy.visit(`produtos/${nomeProduto}`) interpolação de string
        //urlformatada = nomeProduto.replace(/ /g, '-') forma de substituir espaco por -
        const urlFormatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produtos/${urlFormatada}`)
    }
    
    addProdutoCarrinho(tamanho, cor, quantidade) {
        //+ tamanho adiciona o valor da variavel
        cy.get('.button-variable-item-' + tamanho).click()
        //${cor} interpolação de string, adiciona o valor da variavel na string
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

}

export default new ProdutosPage()
