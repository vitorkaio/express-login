var express = require('express');
var router = express.Router();

// Importa a classe Usuario
let Usuario = require('./models/usuario.js');

// Importa a classe Login.
let Login = require('./services/loginService.js');

// ********************************************** Banco de dados *************************************************************
let db = require('./services/dataBase.js');


// *************************************** Rota GET para o login ***************************************
router.get('/', function (req, res, next) {

    // Verifica se a requisição foi feita por um dispositivo móvel ou um computador.
    // Caso seja um dispositivo móvel, redireciona para uma página de login correspondente.
    let paginaRedireciona = 0;

    if(paginaRedireciona == 1)
        return res.render('login_movel');

    return res.render('login');
});

// *************************************** Rota POST para o login ***************************************
router.post('/', function (req, res, next) {

    // Verifica se o usuários passado existe no banco de dados. Caso sim, deixa logar.
    db.get('SELECT * from usuarios WHERE nome=? AND senha=?', [req.body.nome, req.body.senha], function (e, rows) {

        // Se não achar o usuário, informa que não é possível logar.
        if (!rows)
            return res.render('login', {
                mensagem: 'Usuário não cadastrado no sistema!'
            });

        // Usuário encontrado e redirecionado para a tela home.
        else {
            console.log(rows);
            let user = new Usuario(rows.nome, rows.senha, rows.email, rows.tipo);
            req.session.user = user;
            return res.redirect('/home');
        }
    });

});


// *************************************** Rota GET para o cadastro ***************************************
// Cria a rota para o cadastro. /login/cadastro
router.get('/cadastro', function (req, res, next) {
    res.render('cadastro');
});

// *************************************** Rota POST para o cadastro ***************************************
// Cria a rota para o cadastro. /login/cadastro
router.post('/cadastro', function (req, res, next) {

    // Verifica se todos os campos foram preenchidos.
    if (!Login.fieldsIsEmptySingup(req)) {
        res.status("400");
        return res.send("Campos vazios!");
    } 
    
    else {

        //Verificar se o usuários já existe.
        db.get('SELECT * from usuarios WHERE nome=?', [req.body.nome], function (e, rows) {

            if (rows) {
                console.log(rows);
                return res.render('cadastro', {
                    mensagem: 'Usuário já cadastrado no sistema!'
                });
            } 
            
            else {
                // Verifica se a senha e senha2 estão batendo.
                // Caso não esteja informa o erro.
                if (req.body.senha != req.body.senha2)
                    return res.render('cadastro', {
                        mensagem: 'As senhas não estão batendo!'
                    });

                // Cria um objeto do tipo Usuario e o adiciona na listaDeUsuarios. E adiciona o usuário na sessão.
                let user = new Usuario(req.body.nome, req.body.email, req.body.senha, 'u');
                //listaDeUsuarios.push(user);
                req.session.user = user;

                // Insere o novo usuário no sistema.
                let stmt = db.prepare("INSERT INTO usuarios VALUES(?,?,?,?)");
                stmt.run(req.body.nome, req.body.senha, req.body.email, 'u');
                stmt.finalize();

                console.log('-----> ' + user);

                return res.redirect('/home');
                //return res.render('cadastro', {mensagem: 'Existem campos vazios!'});
            }
        });

    }

});


module.exports = router;