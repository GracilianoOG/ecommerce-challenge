import { produtosServices } from "../services/produtos-services.js";

SimpleMaskMoney.setMask("[data-campo='preco']", {
    prefix: 'R$ ',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'move'
  });

const formulario = document.querySelector("[data-confirmar]");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const botaoAdicionar = document.querySelector("[data-botao-adicionar]");
    botaoAdicionar.classList.add("adiciona-produtos__adicionar--disabled");
    botaoAdicionar.disabled = true;

    const imagem = document.querySelector("[data-campo='imagem']").value;
    const categoria = document.querySelector("[data-campo='categoria']").value;
    const nome = document.querySelector("[data-campo='nome']").value;
    const preco = document.querySelector("[data-campo='preco']").value;
    const descricao = document.querySelector("[data-campo='descricao']").value;

    await produtosServices.adicionaProduto(imagem, categoria, nome, preco, descricao);
    window.location.href="../index.html";
});