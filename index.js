/* 
    Aula 19 - Criando uma API parte I
    
    ( x ) Importar o módulo Express.
    ( x ) Inicializar o contrutor do Express.
    ( x ) Criando a Rota e retornando um arquivo HTML.
    ( x ) Criando um interceptador para configurar o formato JSON como requisição para o servidor.
    ( x ) Inicializar o servidor.

    Extras
    ( x ) Importanto o módulo CadastrarProfessor para reaproveitar o cadastro no "banco de dados" improvisado.
    ( x ) Separando os atributos do objeto.
    ( x ) Cadastro do professor em nosso "banco de dados" improvidado.
    ( x ) Apresentar uma mensagem confirmando o cadastro e permitindo que o usuário realizar um novo cadastro.
*/

// 1. Importar o módulo Express.
const express = require('express');
// Extra: Importanto o módulo CadastrarProfessor desenvolvido na Aula 15 - Módulos Nativos (File System Nodejs) https://github.com:dh-wssantanna/ctd-imperativa-aula15.git.
const CadastrarProfessor = require('./cadastrar');

// 2. Inicializar o contrutor do Express.
const app = new express();

/* 
    4. Criando um interceptador para configurar o formato
    de dados desejado no servidor. Prefenimos como JSON.
    
    Explicação: 

    Interceptadores (Middleware) tem como objetivo executar um treco 
    de código antes da rota ser executada.

    Obs.: Os interceptadores precisam ser inicializados antes
    de todas as declarações de rotas. 
*/
app.use(express.json()); // Converte os valores do formulário para JSON.
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 3. Criando a Rota e retornando um arquivo HTML.
app.get('/cadastrar', (_, respostaDoServidor) => respostaDoServidor.sendFile(__dirname + '/cadastrar.html'));

// 5. Criando a Rota para receber os dados.
//app.post('/cadastrar', (requisicaoAoServidor, respostaDoServidor) => respostaDoServidor.json(requisicaoAoServidor.body));
app.post('/cadastrar', (requisicaoAoServidor, respostaDoServidor) => {
    // EXTRA: 5.1. Separando os atributos do objeto que me interessam.
    // Documentação:  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { nome, sobrenome } = requisicaoAoServidor.body;
    // EXTRA: 5.2. Cadastro do professor em nosso "banco de dados" improvidado.
    // Obs.: Deve ter notado que não associei o contrutor a nenhuma instancia/variavel...
    // No caso, como não será utilizado em nenhum trecho de código, posso simplesmente construir sem associar a uma variável.
    new CadastrarProfessor(nome, sobrenome);

    // EXTRA: 5.3. Enviar para uma arquivo HTML responsável pelo resultado.
    // Obs.: Isso não é um redirecionamento, apenas inserimos um HTML temporáricamente na rota /cadastrar.
    respostaDoServidor.sendFile(__dirname + '/resultado.html');
});

// 6. Inicializar o servidor.
app.listen(8081, () => console.log('Servidor funcionando!'));
