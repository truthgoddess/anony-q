/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Question = db.model('question')

describe('Question model', () => {
  let question
  let user

  beforeEach(async () => {
    question = await Question.create({text: 'What do you like?'})
    user = await question.createUser({hashedRoomId: 'slkjdf83'})
    return db.sync({force: true})
  })

  describe('question Model Checks', () => {
    it('is associated with the correct userId after user is associated with it', () => {
      expect(question.dataValues.userId).to.be.equal(user.id)
    })

    it('question has 5 fields', () => {
      expect(Object.keys(question.dataValues).length).to.be.equal(8)
    })

    it('question defaults likes, dislikes, and favorite', () => {
      expect(question.dataValues.likes).to.be.equal(0)
      expect(question.dataValues.dislikes).to.be.equal(0)
      expect(question.dataValues.favorite).to.be.equal(false)
    })

    it('question has an integer userId that is not empty', () => {
      expect(question.dataValues.userId).to.be.an('number')
    })
  }) // end describe ('question Model Checks')

  describe('question Model instance method checks', () => {
    it('inLikes increases likes by 1', () => {
      for (let i = 0; i < 5; i++) {
        question.incLikes()
      }
      expect(question.dataValues.likes).to.be.equal(5)
    })

    it('inLikes increases dislikes by 1', () => {
      for (let i = 0; i < 6; i++) {
        question.incDislikes()
      }
      expect(question.dataValues.dislikes).to.be.equal(6)
    })

    it('isFavorite changes questions favorite status at 90% threshold ', () => {
      for (let i = 0; i < 11; i++) {
        question.incLikes()
      }
      expect(question.dataValues.favorite).to.be.equal(true)
      question.incDislikes()
      expect(question.dataValues.favorite).to.be.equal(true)
      question.incDislikes()
      expect(question.dataValues.favorite).to.be.equal(false)
    })
  }) // end describe ('question Model Checks')
}) // end describe('question model')
