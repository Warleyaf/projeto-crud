const mongoose = require('mongoose')

/* Conectando no banco */

function connect() {
  
  mongoose.connect('mongodb://localhost:27017/projeto-crud')
  
  const db = mongoose.connection
  
  // Esse método aqui de baixo é apenas para eu ter um feedback que conectou no banco
  db.once('open', () => { // esse open quer dizer que uma vez que conectar o meu banco eu quero passar uma callback
    console.log('Connected to database!')
  })
  // feedback caso der um erro na conexão 
  db.on('error', console.error.bind(console, 'connection error: '))
}

// Exportando essa função conect
module.exports = {
  connect
}