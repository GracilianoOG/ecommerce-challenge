import { validacaoServices } from "../services/validacao-services.js";

const campos = document.querySelectorAll("[data-campo]");

campos.forEach(campo => {
    campo.addEventListener("blur", (event) => {
        validacaoServices.validaCampo(event.target);
    });
});