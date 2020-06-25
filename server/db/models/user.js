// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  hashedRoomId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
})

module.exports = User
