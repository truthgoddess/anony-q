const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Room = db.define('room', {
  hashedRoomId: {
    type: Sequelize.STRING,
  },
  hostId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  //use stuff below to make unique room id?
  // password: {
  //   type: Sequelize.STRING,
  //   // Making `.password` act like a func hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('password')
  //   }
  // },
  // salt: {
  //   type: Sequelize.STRING,
  //   // Making `.salt` act like a function hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('salt')
  //   }
  // },
  // googleId: {
  //   type: Sequelize.STRING
  // }
})

module.exports = Room

// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

// /**
//  * classMethods
//  */
Room.generateRoomId = function () {
  return crypto.randomBytes(6).toString('base64')
}

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

// /**
//  * hooks
//  */
const assignRoomId = async (room) => {
  let roomId = await Room.generateRoomId()
  let roomFound = await Room.findOne({
    where: {hashedRoomId: roomId},
  })
  while (roomFound) {
    roomId = Room.generateRoomId()
    roomFound = await Room.findOne({
      where: {hashedRoomId: roomId},
    })
  }
  room.hashedRoomId = roomId
}

Room.afterValidate(assignRoomId)
// User.beforeUpdate(setSaltAndPassword)
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword)
// })
