const validadores = {
    "nome": {
        valueMissing: "O nome não pode estar vazio!",
        tooLong: "O tamanho do nome foi excedido!"
    },
    "mensagem": {
        valueMissing: "A mensagem não pode estar vazia!",
        tooLong: "O tamanho da mensagem foi excedida!"
    },
    "imagem": {
        valueMissing: "Insira o link da imagem do produto!",
        typeMismatch: "Insira um link válido!"
    },
    "categoria": {
        valueMissing: "Insira uma categoria!",
        tooLong: "O tamanho da categoria foi excedida!",
        customError: "Categoria inserida não existe!"
    },
    "produto-nome": {
        valueMissing: "Insira o nome do produto!",
        tooLong: "O tamanho do produto foi excedido!"
    },
    "preco": {
        valueMissing: "Insira o preço do produto!",
        tooLong: "O tamanho do preço do produto foi excedido!"
    },
    "descricao": {
        valueMissing: "Insira uma descrição!",
        tooLong: "O tamanho da descrição foi excedida!"
    },
    "email": {
        valueMissing: "Insira o seu e-mail!",
        typeMismatch: "O formato do e-mail é inválido!"
    },
    "senha": {
        valueMissing: "Insira a sua senha!"
    }
}

function validaCampo(campo) {
    const tipoCampo = campo.dataset.campo;
    const listaValidadores = Object.entries(validadores[tipoCampo]);
    listaValidadores.every(validador => {
        const validacao = campo.validity[validador[0]];
        // console.log(validador, validacao);
        if(validacao) {
            aplicaErro(campo, validador[1]);
            return false;
        }
        retiraErro(campo);
        return true;
    });
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

export const validacaoServices = {
    validaCampo
}