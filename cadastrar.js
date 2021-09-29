// Importação do módulo File System do Nodejs.
const fs = require('fs');
// Carregar o arquivo do nosso banco de dados.
const arquivoEmJSON = fs.readFileSync(__dirname + '/banco-de-dados.json', 'utf-8');
// Converte o arquivo de texto para objeto literal para poder manipulá-lo.
const arquivoConvertidoEmObjetoLiteral = JSON.parse(arquivoEmJSON);

function CadastrarProfessor(nomeDoProfessor, sobrenomeDoProfessor) {

    /* 
        Criação de variáveis públicas ou privadas ficam no topo da função.
        No caso esses atributos são privados e só podem ser acessados através 
        da funções públicas de get e set.    
    */
    var nome = nomeDoProfessor;
    var sobrenome = sobrenomeDoProfessor;

    /* 
        Conceitualmente chamado de Get.
        Serve para acessar um atriputo privado.
    */
    this.pegarNome = function() {
        return nome;
    }

    this.pegarSobrenome = function() {
        return sobrenome;
    }

    this.pegarNomeCompleto = function() {
        return `${nome} ${sobrenome}`; 
    }

    /* 
        Conceitualmente chamado de Set.
        Serve para definir um novo valor a um atributo privado.
    */
    this.definirNome = function(novoNome) {
        nome = novoNome;
        return nome;
    }

    this.definirSobrenome = function(novoSobrenome) {
        sobrenome = novoSobrenome;
        return sobrenome;
    }

    function salvarNoBancoDeDados() {
        // Caso os valores nome e sobrenome não estejam vazios e sejam uma string.
        if(validarSeOValorEhUmaString()) {
            /* 
                Adiciono o objeto com o nome e sobrenome da Array.
                Omiti o valor, pois o valor tem o mesmo nome da chave. O código a baixo acaba sendo a mesma coisa que:

                arquivoConvertidoEmObjetoLiteral.push({
                    nome: nome,
                    sobrenome: sobrenome
                });
            */
            arquivoConvertidoEmObjetoLiteral.push({
                nome,
                sobrenome
            });
            // Converto o resultado em string.
            const arquivoConvertidoEmString = JSON.stringify(arquivoConvertidoEmObjetoLiteral);
            // Sobrescreve o arquivo banco-de-dados.json com o arquivo atualizado.
            fs.writeFileSync(__dirname + '/banco-de-dados.json', arquivoConvertidoEmString);
        } 
        else {
            return 'Não é um nome válido.';
        }
    }

    function validarSeOValorEhUmaString() {
        var naoEstaVazio = (nome && sobrenome);
        var ehUmaString = (typeof(nome) == 'string' && typeof(sobrenome) == 'string');
                
        return (naoEstaVazio && ehUmaString);
    }

    // Executo ela dentro do objeto para salvar no banco de dados o novo professor.
    salvarNoBancoDeDados();

}

module.exports = CadastrarProfessor;