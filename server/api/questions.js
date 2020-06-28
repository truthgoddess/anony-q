const router = require('express').Router()
const {Question} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      where: {hashedRoomId: req.body.hashedRoomId},
    })
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

router.put('/like', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.body.questionId)
    await question.incLikes()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/dislike', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.body.questionId)
    await question.incDislikes()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete('/delete', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.body.questionId)
    question.hashedRoomId = ''
    question.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
