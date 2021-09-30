/* 
    Aula 20 - Criando uma API parte II
    
    (  ) Instação e configuração de uma template engine. 
         Documentação: 
            https://expressjs.com/pt-br/guide/using-template-engines.html
            https://expressjs.com/en/resources/template-engines.html
    (  ) Atualizar o código dos arquivos HTML.
    (  ) Criar uma rota de listagem de professores.
    (  ) Imprimir na tela a lista de professores.
*/

const express = require('express');
//  1. Importação do Template Engine¹.
const handlebars  = require('express-handlebars');

const CadastrarProfessor = require('./cadastrar');
const Professores = require('./listar');

const aplicativo = new express();
const professores = new Professores();

aplicativo.use(express.json()); // Converte os valores do formulário para JSON.
aplicativo.use(express.urlencoded({ extended: true })); // for parsing aplicativolication/x-www-form-urlencoded

//  2. Definição da pasta responsável pelas telas que o usuário irá acessar.
aplicativo.set('views','./visualizacoes');

/* 
    3. Definição do motor de renderização² das telas. 
    Nesse caso definimos o handlebars, mas existe uma lista 
    enorme de opções³.
*/
aplicativo.set('view engine', 'handlebars');

/* 
    4. Configuração do Template Engine. 
    No caso apenas definimos apenas qual arquivo será 
    responsável por ser o modelo base que será reaproveitado 
    em cada tela.
*/
aplicativo.engine('handlebars', handlebars({ defaultLayout: 'modelo' }));

// 5. Renderização² da tela cadastrar para o usuário.
aplicativo.get('/', (_, respostaDoServidor) => respostaDoServidor.render('cadastrar',{ professores: professores.listar() }));

// 6. Listar todos os professores cadastrados, e enviar os dados em JSON.
aplicativo.get('/listar', (_, respostaDoServidor) => respostaDoServidor.json(professores.listar()));

aplicativo.post('/cadastrar', (requisicaoAoServidor, respostaDoServidor) => {
    const { nome, sobrenome } = requisicaoAoServidor.body;
    new CadastrarProfessor(nome, sobrenome);

    respostaDoServidor.render('resultado');
});

aplicativo.listen(1234, () => console.log('Servidor funcionando!'));

/*
    ¹ Template Engines auxiliam na manipulação de documentos html
      inserindo recursos que facilitam a apresentação de dados dinânimos.
      Alguns dos principais recursos são: variáveis, repetições, condicionais,
      etc.

    ² Renderizar é sinônimo de desenhar.
    
    ³ Existem algumas opções de Template Engines. O Express sugere alguns, 
      mas com uma breve pesquisa, é possível encontrar muitas outras opções.
      Documentação: https://expressjs.com/en/resources/template-engines.html
*/