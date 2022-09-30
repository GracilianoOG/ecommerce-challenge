async function mostraTodosProdutos() {
    const response = await fetch("http://localhost:3000/produtos");
    if(!response.ok) {
        window.location.href = "../erro.html";
        throw new Error("Não foi possível mostrar os produtos.");
    }
    const produtos = await response.json();
    const produtosContainer = document.querySelector("[data-produtos]");

    produtos.forEach(produto => {
        produtosContainer.innerHTML +=
        `
        <div class="produto" data-produto-id=${produto.id}>
            <div class="produto__painel-administracao">
                <button class="painel-administracao__botao painel-administracao__botao--deletar" data-botao="deletar"></button>
                <button class="painel-administracao__botao painel-administracao__botao--editar" data-botao="editar"></button>
            </div>
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
    if(!response.ok) {
        window.location.href = "../erro.html";
        throw new Error("Não foi possível mostrar os produtos.");
    }
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
    if(!response.ok) {
        window.location.href = "../erro.html";
        throw new Error("Não foi possível mostrar os produtos.");
    }
    const produtos = (await response.json()).slice(0, 6);
    const containerCategoria = document.querySelector(`[data-categoria="${produtosCategoria}"]`).lastElementChild;
    mostraProdutos(produtos, containerCategoria);
}

async function mostraProdutosSimilares(produtoMostradoID, produtosCategoria, containerCategoria) {
    const response = await fetch(`http://localhost:3000/produtos?categoria=${produtosCategoria}`);
    if(!response.ok) {
        window.location.href = "../erro.html";
        throw new Error("Não foi possível mostrar os produtos similares.");
    }
    const produtos = (await response.json()).slice(0, 7);
    const todosProdutos = produtos.filter(produto => produtoMostradoID != produto.id);
    mostraProdutos(todosProdutos, containerCategoria);
}

async function mostraProdutoIndividual(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);
    if(!response.ok) {
        window.location.href = "../erro.html";
        throw new Error("Não foi possível mostrar o produto.");
    }
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
    if(response.ok) {
        return response.body;
    }
    window.location.href = "../erro.html";
    throw new Error("Não foi possível adicionar o produto.");
}

async function editaProduto(id, imagem, categoria, nome, preco, descricao) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
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
    if(response.ok) {
        return response.body;
    }
    window.location.href = "../erro.html";
    throw new Error("Não foi possível editar o produto.");
}

async function deletaProduto(id) {
    await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE"
    });
}

async function detalhaProduto(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);
    const produtos = await response.json();
    return produtos;
}

export const produtosServices = {
    mostraTodosProdutos,
    mostraProdutosCategorizados,
    mostraProdutosSimilares,
    mostraProdutoIndividual,
    adicionaProduto,
    editaProduto,
    deletaProduto,
    detalhaProduto
}