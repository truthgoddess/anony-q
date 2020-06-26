/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Room = db.model('room')

describe('User model', () => {
  let user, room, hostUser

  beforeEach(async () => {
    try {
      hostUser = await User.create({host: true})
      user = await User.create({hashedRoomId: hostUser.hashedRoomId})
      room = await Room.findOne({
        where: {hashedRoomId: user.hashedRoomId},
      })
      return await db.sync({force: true})
    } catch (error) {
      console.log(error)
    }
  })

  describe('User Model Checks', () => {
    it('user has 6 fields', () => {
      expect(Object.keys(user.dataValues).length).to.be.equal(6)
    })

    it('user has string hashedRoomId that is not empty', () => {
      expect(user.dataValues.hashedRoomId).to.be.an('string')
      expect(user.dataValues.hashedRoomId.length).to.be.greaterThan(0)
    })

    it('has a roomId associated with it', () => {
      expect(user.hashedRoomId).to.be.equal(room.hashedRoomId)
      expect(user.dataValues.roomId).to.be.equal(room.dataValues.id)
    })
  }) // end describe ('User Model Checks')
}) // end describe('User model')
