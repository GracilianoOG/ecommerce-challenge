import { produtosServices } from "../services/produtos-services.js";

const produtosContainer = document.querySelector("[data-produtos]");

produtosContainer.addEventListener("click", (event) => {
    const tipoBotao = event.target.dataset.botao;
    const produtoContainer = event.target.parentElement.parentElement;
    const produtoID = produtoContainer.dataset.produtoId;

    if(tipoBotao) {
        switch(tipoBotao) {
            case "deletar":
                produtoContainer.remove();
                produtosServices.deletaProduto(produtoID);
                break;
            case "editar":
                window.location.href = `edita-produtos.html?id=${produtoID}`;
                break;
            default:
                throw new Error("Botão não existe!");
        }
    }
});

produtosServices.mostraTodosProdutos();