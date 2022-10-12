import { validacaoServices } from "../services/validacao-services.js";

const campos = document.querySelectorAll("[data-form-contato]");

campos.forEach(campo => {
    campo.addEventListener("blur", (event) => {
        validacaoServices.validaContato(event.target);
    });
});