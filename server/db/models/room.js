const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  hashedRoomId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
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
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

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
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt()
//     user.password = User.encryptPassword(user.password(), user.salt())
//   }
// }

// User.beforeCreate(setSaltAndPassword)
// User.beforeUpdate(setSaltAndPassword)
// User.beforeBulkCreate(users => {
//   users.forEach(setSaltAndPassword)
// })
