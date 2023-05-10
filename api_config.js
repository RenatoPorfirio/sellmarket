const express = require('express');
const pool = require('./bd_config');
const api = express();

api.get('/', (requisicao, resposta) => {
  const ip = requisicao.headers['x-forwarded-for'] || requisicao.socket.remoteAddress;
  resposta.send('SERVIDOR ATIVO!')
  console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
});

//buscar fornecedor
api.get('/busca/fornecedor', (requisicao, resposta) => {
  const ip = requisicao.headers['x-forwarded-for'] || requisicao.socket.remoteAddress;
  try{
    let id = requisicao.query.id;
    if(id === undefined || !id || isNaN(id))
      id = '0';
    try{
      pool.getConnection((erro, conexao) => {
        console.log('<'+ip+'>', 'Solicitacao de conexao com o banco de dados.');
        if (erro) throw erro;
        console.log('<'+ip+'>', 'Conexao bem sucedida.');
  
        conexao.query('select * from fornecedor where id_fornecedor = '+id, (erro, resultado, campos) => {
          if(erro) throw erro;
          resposta.send(JSON.stringify(resultado[0], null, 3));
        });
        console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
        conexao.release();
        console.log('<'+ip+'>', 'Conexão com o banco de dados encerrada.');
      });
    }
    catch{
      console.log('Erro ao tentar conectar-se ao banco de dados!');
      resposta
        .status(500)
        .send(JSON.stringify({estado: 500, mensagem: 'Houve um problema na conexão com o banco de dados. Desculpe o transtorno!'}), null, 3);
      console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
    }
  }
  catch{
      resposta
          .status(500)
          .send(JSON.stringify({estado: 500, mensagem: 'Houve um problema com a requisicao. Verifique a documentacao da api e tente novamente.'}), null, 3);
        console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
  }
});

//buscar produto
api.get('/busca/produto', (requisicao, resposta) => {
  const ip = requisicao.headers['x-forwarded-for'] || requisicao.socket.remoteAddress;
  try{
    let cod = requisicao.query.cod;
    if(cod === undefined || !cod || isNaN(cod))
    try{
      pool.getConnection((erro, conexao) => {
        console.log('<'+ip+'>', 'Solicitacao de conexao com o banco de dados.');
        if (erro) throw erro;
        console.log('<'+ip+'>', 'Conexao bem sucedida.');
  
        conexao.query('select * from produto where cod_produto = '+cod, (erro, resultado, campos) => {
          if(erro) throw erro;
          resposta.send(JSON.stringify(resultado[0], null, 3));
        });
        console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
        conexao.release();
        console.log('<'+ip+'>', 'Conexão com o banco de dados encerrada.');
      });
    }
    catch{
      console.log('Erro ao tentar conectar-se ao banco de dados!');
      resposta
        .status(500)
        .send(JSON.stringify({estado: 500, mensagem: 'Houve um problema na conexão com o banco de dados. Desculpe o transtorno!'}), null, 3);
      console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
    }
  }
  catch{
      resposta
          .status(500)
          .send(JSON.stringify({estado: 500, mensagem: 'Houve um problema com a requisicao. Verifique a documentacao da api e tente novamente.'}), null, 3);
        console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
  }
});

api.use((requisicao, resposta) => {
  const ip = requisicao.headers['x-forwarded-for'] || requisicao.socket.remoteAddress;
  resposta
    .status(404)
    .send('ROTA NÃO ENCONTRADA.');
  console.log('<'+ip+'>', requisicao.method, requisicao.url, resposta.statusCode);
});

module.exports = api;