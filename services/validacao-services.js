const validacoes = {
    valueMissing: "Campo vazio!",
    tooLong: "Tamanho do campo excedido!"
}

function aplicaErro(campo, erro) {
    campo.classList.add("formulario__campo--erro");
    campo.nextElementSibling.nextElementSibling.style.display = "block";
    campo.nextElementSibling.nextElementSibling.textContent = erro;
}

function retiraErro(campo) {
    campo.nextElementSibling.nextElementSibling.style.display = "none";
    campo.classList.remove("formulario__campo--erro");
}

function checaCampoVazio(campo) {
    const validacao = campo.validity.valueMissing;
    if(validacao) {
        aplicaErro(campo, validacoes["valueMissing"]);
    } else {
        retiraErro(campo);
    }
    return validacao;
}

function checaQuantidadeCaracteres(campo) {
    const validacao = campo.validity.tooLong;
    if(validacao) {
        aplicaErro(campo, validacoes["tooLong"]);
    } else {
        retiraErro(campo);
    }
    return validacao;
}

function validaContato(campo) {
    if(checaCampoVazio(campo)) return;
    if(checaQuantidadeCaracteres(campo)) return;
}

export const validacaoServices = {
    validaContato
}