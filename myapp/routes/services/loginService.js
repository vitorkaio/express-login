// Classe que define metódos relacionados ao Login.

// Importa a classe DataBase.
//let dataBase = require('./dataBase.js');

class Login{

    constructor(){
        this.db = new dataBase();
    }

    // Metódo que verifica se existe algum usuário está logado.
    // req é o objeto referente a requisição da aplicação.
    // Retorna true em caso verdadeiro, false caso contrário.
    static isLogged(req){
        if(!req.session.user)
            return false;
  
        return true;
    }

    // Metódo que verifica se algum campo da tela de login está em branco.
    // req é o objeto referente a requisição da aplicação.
    // Retorna true em caso verdadeiro, false caso contrário.
    static fieldsIsEmptyLogin(req){
        if(!req.body.nome || !req.body.senha)
            return false;
        
        return true;
    }

     // Metódo que verifica se algum campo da tela de cadastro está em branco.
    // req é o objeto referente a requisição da aplicação.
    // Retorna true em caso verdadeiro, false caso contrário.
    static fieldsIsEmptySingup(req){
        if(!req.body.nome || !req.body.email || !req.body.senha || !req.body.senha2)
            return false;
        
        return true;
    }

    // Metódo que verifica se o usuário passado existe no sistema.
    // req é o objeto referente a requisição da aplicação. listaDeUsuarios é uma lista com os usuários do sistema.
    // Retorna o usuários em caso verdadeiro, null caso contrário.
    static isRegistered(req){
        /*let user = db.pesquisaUsuario(req.body.nome, req.body.senha);
        if(user != null)
            if(user.nome == req.body.nome && user.senha == req.body.senha)
                return user;*/

        return null;
    }

    // Metódo que verifica se o usuário passado já cadastrou no sistema.
    // req é o objeto referente a requisição da aplicação. listaDeUsuarios é uma lista com os usuários do sistema.
    // Retorna o usuários em caso verdadeiro, null caso contrário.
    static userExists(req, listaDeUsuarios){
        let contador = 0;
        for(; contador < listaDeUsuarios.length; contador++)
            if(listaDeUsuarios[contador].getNome() == req.body.nome)
                return listaDeUsuarios[contador];
        
        return null;
    }

    static logout(req){
        req.session.destroy(function(){
            console.log('Logout no sistema feito');
        });
    }

}// Fim da classe Login.

module.exports = Login;