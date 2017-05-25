var express = require('express');
var router = express.Router();

// Importa a classe Login.
let Login = require('./services/loginService.js');

// ***************************************** Intercepta requisição ****************************************************** 

// Verifica se existe algum usuário loagado.
let isLogged = function (req, res, next){
  
  console.log('Requisição interceptada!!!');
  
  // Verfica se o usuários está cadastrado, caso não esteja redireciona para a tela de login.
  if(!Login.isLogged(req))
     return res.redirect('/login');
  else
    next();
};

// ***************************************** tryOut ****************************************************** 

// Verifica se existe algum usuário está loagado. Se tiver força voltar para o home, só irá sair se clicar em logout.
let tryOut = function (req, res, next){
  
  console.log('Try out!!!');
  
  // Verfica se o usuários está logado, caso esteja força ida para o home.
  if(Login.isLogged(req))
     return res.redirect('/home');
  else
    next();
};

// ***************************************** router use ****************************************************** 
router.use('/login', tryOut);
router.use('/home', isLogged); 

/* GET home page. */
router.get('/', function(req, res, next) {
  //return res.render('index',{title: 'ola'});
  res.redirect('/login');
});

// ****************************************************** Home ****************************************************** 
router.get('/home', function(req, res, next) {
  
  return res.render('home', {nome: req.session.user.nome});
});

// *************************************** Rota POST para o logout ***************************************
router.get('/exit', function(req, res, next){

    Login.logout(req);

    res.redirect('/login');
});

module.exports = router;
