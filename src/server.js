const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')

const db = require('./database') // Não preciso informar o arquivo index, por que como ele está sozinho já entende que é ele que eu quero importar
const routes = require('./routes') // Impiortando o meu router que stá na pastar routes
const app = express()

// Conexão com o banco de dados
db.connect()

// definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // para pegar a minha pasta views

//definindo arquivos públicos
app.use(express.static(path.join(__dirname, 'public')))

// habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true }))

// definindo as rotas
app.use('/', routes)


// 404 error (not found)
app.use((req, res) => { //middleware
  res.send('Página não encontrada!')
})


// Executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listerning on port ${port}`))