/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  let user

  beforeEach(async () => {
    user = await User.create({hashedRoomId: '398f78s'})
    return db.sync({force: true})
  })

  describe('User Model Checks', () => {
    it('user has only 4 fields', () => {
      expect(Object.keys(user.dataValues).length).to.be.equal(5)
    })

    it('user has string roomId that is not empty', () => {
      expect(user.dataValues.hashedRoomId).to.be.an('string')
      expect(user.dataValues.hashedRoomId.length).to.be.greaterThan(0)
    })
  }) // end describe ('User Model Checks')
}) // end describe('User model')
