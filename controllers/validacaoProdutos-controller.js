import { produtosServices } from "../services/produtos-services.js";

const campoCategoria = document.querySelector("[data-campo='categoria']");

campoCategoria.addEventListener("input", async () => {
    const listaCategorias = await produtosServices.detalhaCategorias();
    if(!listaCategorias[campoCategoria.value]) {
        campoCategoria.setCustomValidity("Categoria não existe!");
        return;
    }
    campoCategoria.setCustomValidity("");
});