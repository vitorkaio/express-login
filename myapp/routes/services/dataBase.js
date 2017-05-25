// Instalar: npm install firebase-admin --save
let sqlite = require("sqlite3").verbose();
let db = new sqlite.Database('./routes/services/dados.db')

db.run('CREATE TABLE IF NOT EXISTS usuarios' + 
       '(nome varchar(30) PRIMARY KEY,' +
       'senha varchar(30),' +
       'email varchar(30),' +
       'tipo char)' 
       
    );

module.exports = db;