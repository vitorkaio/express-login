class Usuario {
    constructor (nome, email, senha, tipo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }

    // ********************** SET ****************************
    setNome(nome){
        this.nome = nome;
    }

    setEmail(email){
        this.email = email;
    }

    setNome(senha){
        this.senha = senha;
    }

    setNome(tipo){
        this.tipo = tipo;
    }

     // ********************** GET ****************************
    getNome(){
        return this.nome;
    }

    getEmail(){
        return this.email;
    }

    getSenha(){
        return this.senha;
    }

    getTipo(){
        return this.tipo;
    }

}// Fim da classe Usuario

module.exports = Usuario;