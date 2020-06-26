/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Question = require('./question')
const User = db.model('user')

describe('Question model', () => {
  let user, hostUser, question, question2
  let questionText = 'What do you like to eat?'
  let questionText2 = 'Do you like to pet cats?'

  beforeEach(async () => {
    hostUser = await User.create({host: true})
    user = await User.create({hashedRoomId: hostUser.hashedRoomId})
    question = await user.askQuestion(questionText)
    question2 = await hostUser.askQuestion(questionText2)
    return db.sync({force: true})
  })

  describe('question Model Checks', () => {
    it('is associated with the correct userId after user is associated with it', () => {
      expect(question.userId).to.be.equal(user.id)
    })

    it('works for hosts too', () => {
      expect(question2.userId).to.be.equal(hostUser.id)
    })

    it('question has 5 fields', () => {
      expect(Object.keys(question.dataValues).length).to.be.equal(8)
    })

    it('sets the correct quesiton to the question field', () => {
      expect(question.question).to.be.equal(questionText)
    })

    it('question defaults likes, dislikes, and favorite', () => {
      expect(question.likes).to.be.equal(0)
      expect(question.dislikes).to.be.equal(0)
      expect(question.favorite).to.be.equal(false)
    })

    it('question has an integer userId that is not empty', () => {
      expect(question.userId).to.be.an('number')
    })
  }) // end describe ('question Model Checks')

  describe('question Model instance method checks', () => {
    it('inLikes increases likes by 1', () => {
      for (let i = 0; i < 5; i++) {
        question.incLikes()
      }
      expect(question.likes).to.be.equal(5)
    })

    it('inLikes increases dislikes by 1', () => {
      for (let i = 0; i < 6; i++) {
        question.incDislikes()
      }
      expect(question.dislikes).to.be.equal(6)
    })

    it('isFavorite changes questions favorite status at 90% threshold ', () => {
      for (let i = 0; i < 11; i++) {
        question.incLikes()
      }
      expect(question.favorite).to.be.equal(true)
      question.incDislikes()
      expect(question.favorite).to.be.equal(true)
      question.incDislikes()
      expect(question.favorite).to.be.equal(false)
    })
  }) // end describe ('question Model Checks')
}) // end describe('question model')
