import { produtosServices } from "../services/produtos-services.js";

const imagem = document.querySelector("[data-campo='imagem']").value;
const categoria = document.querySelector("[data-campo='categoria']").value;
const nome = document.querySelector("[data-campo='nome']").value;
const preco = document.querySelector("[data-campo='preco']").value;
const descricao = document.querySelector("[data-campo='descricao']").value;
const formulario = document.querySelector("[data-confirmar]");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    produtosServices.adicionaProduto(imagem, categoria, nome, preco, descricao)
    .then(() => window.location.href="../index.html");
});