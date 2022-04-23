const router = require('express').Router()

const CustomersController = require('../controllers/customers')
const IndexController = require('../controllers/index')
//rotas
router.get('/', IndexController.index)

// registro
router.get('/register', CustomersController.index)
router.post('/register/add', CustomersController.add)

//Listar Usuários
router.get('/list', CustomersController.listUsers) // iremos criar esse método dentro do customers

// Editar usuário rota
router.get('/edit', CustomersController.formEdit)
router.post('/edit/:id', CustomersController.edit)

//Remover
router.get('/remove/:id', CustomersController.remove)


// Exportando o router
module.exports = router
