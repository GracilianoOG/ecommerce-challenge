function mostraTodosProdutos() {
    fetch("http://localhost:3000/produtos")
    .then((response) => {
        return response.json();
    })
    .then((produtos) => {
        const produtosContainer = document.querySelector("[data-produtos]");

        produtos.forEach(produto => {
            produtosContainer.innerHTML +=
            `
            <div class="produto">
                <img class="produto__imagem" src="${produto.imagem}" alt="">
                <h3 class="produto__nome">${produto.nome}</h3>
                <h4 class="produto__preco">${produto.preco}</h4>
                <h5 class="produto__identificador">#${produto.id}</h4>
            </div>
            `;
        })
    })
}

export const produtosServices = {
    mostraTodosProdutos
}