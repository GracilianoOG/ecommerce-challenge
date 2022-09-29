import { produtosServices } from "../services/produtos-services.js";

const produtoURL = new URL(window.location);
const produtoID = produtoURL.searchParams.get("id");
const produtoCategoria = produtoURL.searchParams.get("categoria");
const produtosContainer = document.querySelector("[data-produtos]").lastElementChild;

produtosServices.mostraProdutoIndividual(produtoID);

produtosServices.mostraProdutosSimilares(produtoID, produtoCategoria, produtosContainer);