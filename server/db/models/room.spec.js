/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Room = db.model('room')

describe('Room model', () => {
  let room

  beforeEach(async () => {
    room = await Room.create({hashedRoomId: '398f78s', hostId: 3})
    return db.sync({force: true})
  })

  describe('Room Model Checks', () => {
    it('room has 5 fields', () => {
      expect(Object.keys(room.dataValues).length).to.be.equal(5)
    })

    it('room has string roomId that is not empty', () => {
      expect(room.dataValues.hashedRoomId).to.be.an('string')
      expect(room.dataValues.hashedRoomId.length).to.be.greaterThan(0)
    })

    it('room has an integer userId that is not empty', () => {
      expect(room.dataValues.hostId).to.be.an('number')
    })
  }) // end describe ('Room Model Checks')
}) // end describe('Room model')
