const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = "iniSecret"

const hashPassword = (password) => bcrypt.hashSync(password)
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash)
const signPayload = (payload) => jwt.sign(payload, SECRET)
const isValid = (access_token) => jwt.verify(access_token, SECRET)

module.exports = { hashPassword, comparePassword, signPayload, isValid }