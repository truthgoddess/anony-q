const Sequelize = require('sequelize')
const db = require('../db')
const Room = require('./room')

//have to remember, when creating a new user, everything depends
//upon whether the User.create has host as true (make new room) or inputs a hashRoomId (get assigned to a room)

const User = db.define('user', {
  hashedRoomId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  host: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = User

const makeNewRoomOrAssign = async (user) => {
  let room
  if (user.hashedRoomId.length > 0) {
    try {
      room = await Room.findOne({
        where: {hashedRoomId: user.hashedRoomId},
      })
      if (!room) console.log('no room found')
      else await user.setRoom(room)
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      room = await user.createRoom({hostId: user.id})
      user.hashedRoomId = room.hashedRoomId
      await user.setRoom(room)
      await user.save()
    } catch (error) {
      console.log(error)
    }
  }
  return room
}

User.afterCreate(makeNewRoomOrAssign)
User.prototype.askQuestion = async function (question, color) {
  let returnQuestion = await this.createQuestion({
    question: question,
    hashedRoomId: this.hashedRoomId,
    color: color,
  })
  return returnQuestion
}

//if user wants to make a new room
//new User is created with host checked as true ex. User.create({host: true})
//that User creates a Room which generates its own hashedRoomId
//User assigns hashedRoomId from that room to it's own hashedRoomId
//the new room is returned
//if user wants to join a room
//new User is created with host that defaults to false and hashedRoomId equal to the code they put in
//if didn't find room, send error message, but don't create new room
