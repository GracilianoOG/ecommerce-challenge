async function mostraTodosProdutos() {
    const response = await fetch("http://localhost:3000/produtos");
    const produtos = await response.json();
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
}

async function mostraProdutosCategorizados() {
    const response = await fetch("http://localhost:3000/categorias");
    const categorias = await response.json();
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
        `;

        colocaProdutosEmCategorias(categoria[1]);
    })
}

function mostraProdutos(produtos, containerProdutos) {
    produtos.forEach(produto => {
        containerProdutos.innerHTML +=
        `
        <div class="produto">
            <img class="produto__imagem" src="${produto.imagem}" alt="">
            <h3 class="produto__nome">${produto.nome}</h3>
            <h4 class="produto__preco">${produto.preco}</h4>
            <a class="produto__link" href="produto-selecionado.html?id=${produto.id}&categoria=${produto.categoria}">Ver produto</a>
        </div>
        `;
    })
}

async function colocaProdutosEmCategorias(produtosCategoria) {
    const response = await fetch(`http://localhost:3000/produtos?categoria=${produtosCategoria}`);
    const produtos = await response.json();
    const containerCategoria = document.querySelector(`[data-categoria="${produtosCategoria}"]`).lastElementChild;
    mostraProdutos(produtos, containerCategoria);
}

async function mostraProdutosSimilares(produtoMostradoID, produtosCategoria, containerCategoria) {
    const response = await fetch(`http://localhost:3000/produtos?categoria=${produtosCategoria}`)
    const produtos = await response.json();
    const todosProdutos = produtos.filter(produto => produtoMostradoID != produto.id);
    mostraProdutos(todosProdutos, containerCategoria);
}

async function mostraProdutoIndividual(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);
    const produto = await response.json();
    const containerProduto = document.querySelector("[data-produto]");

    containerProduto.innerHTML +=
    `
    <img class="produto-selecionado__imagem" src="${produto.imagem}" alt="">
    <div class="produto-selecionado__informacoes">
        <h1 class="produto-selecionado__titulo">${produto.nome}</h1>
        <h2 class="produto-selecionado__preco">${produto.preco}</h2>
        <h3 class="produto-selecionado__descricao">${produto.descricao}</h3>
    </div>
    `;
}

async function adicionaProduto(imagem, categoria, nome, preco, descricao) {
    const response = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imagem,
            categoria,
            nome,
            preco,
            descricao
        })
    });
    return response.body;
}

export const produtosServices = {
    mostraTodosProdutos,
    mostraProdutosCategorizados,
    mostraProdutosSimilares,
    mostraProdutoIndividual,
    adicionaProduto
}