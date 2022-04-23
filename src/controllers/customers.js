const req = require('express/lib/request')
const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res) {
  res.render('register', {
    title: 'Cadastro Clientes'
  })
}

async function add(req, res) {
  const {
    name,
    age,
    email,
    password,
  } = req.body

  const passwordCrypto = await crypto(password)

  const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto,
  })
  register.save()

  res.render('register', {
    title: defaultTitle,
    message: 'Cadastro realizado com sucesso!',
  })

}

async function listUsers(req, res) {
  const users = await CustomersModel.find()
  res.render('listUsers', {
    title: defaultTitle,
    users,
  })
}

async function formEdit(req, res) {
  const { id } = req.query

  const user = await CustomersModel.findById(id)
  
  res.render('edit', {
    title: 'Editar Usuário',
    user,
  })
}

async function edit(req, res) {
  const {
    name,
    age,
    email,
    password,
  } = req.body

  const { id } = req.params

  const user = await CustomersModel.findById(id)
  // para alterar as coisas no banco
  user.name = name
  user.age = age
  user.email = email

  user.save()
  // depois de salvar vou renderizar a página mandando uma mensagem

  res.render('edit', {
    title: 'Editar Usuário',
    user,
    message: 'Usuário alterado com sucesso!'
  })
} 

async function remove(req, res) {
  const { id } = req.params
  const remove = await CustomersModel.deleteOne({ _id: id })

  if (remove) {
    res.redirect('/listUsers')
  }
}

console.log()

module.exports = {
  index,
  add,
  listUsers,
  formEdit,
  edit,
  remove,
}