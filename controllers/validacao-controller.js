import { validacaoServices } from "../services/validacao-services.js";

const campos = document.querySelectorAll(".formulario__campo");

campos.forEach(campo => {
    campo.addEventListener("blur", (event) => {
        validacaoServices.validaContato(event.target);
    });
});