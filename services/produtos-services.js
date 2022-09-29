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

function mostraProdutosCategorizados() {
    fetch("http://localhost:3000/categorias")
    .then(response => {
        return response.json();
    })
    .then(categorias => {
        const produtosContainer = document.querySelector("[data-produtos]");
        const produtosCategorias = Object.entries(categorias);

        produtosCategorias.forEach(categoria => {
            produtosContainer.innerHTML += 
            `
            <div id="${categoria[0]}" class="produtos__categoria" data-categoria="${categoria[1]}">
                <div class="produtos__cabecalho">
                    <h2 class="produtos__titulo">${categoria[1]}</h2>
                    <a href="produtos-home.html" class="produtos__subtitulo">Ver tudo &#10140;</a>
                </div>
                <div class="produtos__container">

                </div>
            </div>
            `

            mostraProdutosEmCategorias(categoria[1]);
        })
    })
}

function mostraProdutosEmCategorias(produtosCategoria) {
    fetch(`http://localhost:3000/produtos?categoria=${produtosCategoria}`)
    .then(response => {
        return response.json();
    })
    .then(produtos => {
        const containerCategoria = document.querySelector(`[data-categoria="${produtosCategoria}"]`);

        produtos.forEach(produto => {
            containerCategoria.lastElementChild.innerHTML +=
            `
            <div class="produto">
                <img class="produto__imagem" src="${produto.imagem}" alt="">
                <h3 class="produto__nome">${produto.nome}</h3>
                <h4 class="produto__preco">${produto.preco}</h4>
                <a class="produto__link" href="produto-selecionado.html?id=${produto.id}">Ver produto</a>
            </div>
            `
        })
    })
}

export const produtosServices = {
    mostraTodosProdutos,
    mostraProdutosCategorizados
}