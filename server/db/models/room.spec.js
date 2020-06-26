/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Room = db.model('room')
const User = db.model('user')

describe('Room model', () => {
  let hostUser
  let guestUser
  let room

  beforeEach(async () => {
    hostUser = await User.create({host: true})
    guestUser = await User.create({hashedRoomId: hostUser.hashedRoomId})
    room = await Room.findOne({where: {hashedRoomId: hostUser.hashedRoomId}})
    return db.sync({force: true})
  })

  describe('Room Model Checks', () => {
    it('has a randomized hashedRoomId automatcially generated', () => {
      expect(room.hashedRoomId).to.be.an('string')
      expect(room.hashedRoomId.length).to.be.greaterThan(0)
    })

    it('room has 5 fields', () => {
      expect(Object.keys(room.dataValues).length).to.be.equal(5)
    })

    it('has a hostId that is the same as the hostUser', () => {
      expect(hostUser.id).to.be.equal(room.hostId)
    })

    it('room has an integer userId that is not empty', () => {
      expect(room.dataValues.hostId).to.be.an('number')
    })
  }) // end describe ('Room Model Checks')
}) // end describe('Room model')
