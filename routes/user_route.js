const express = require('express')
const { User, validate } = require('../models/user_model')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validObjectId = require('../middleware/validObjectId')
const { register, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user_controller')

const router = express.Router()

//create a user
router.post('/register', async(req, res) => {
  await register(req, res)
})
//get all users
router.get('/', admin, async(req, res) => {
  await getAllUsers(req, res)
})

//get a user by id
router.get('/:id', [validObjectId, auth], async(req, res) => {
  await getUser(req, res)
})

//update user by id
router.put('/:id', [validObjectId, auth], async(req, res) => {
  await updateUser(req, res)
})

//delete a user by id
router.delete('/:id', [validObjectId, admin], async(req, res) => {
  await deleteUser(req, res)
})

module.exports = router