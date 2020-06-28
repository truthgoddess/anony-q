const router = require('express').Router()
const {Question} = require('../db/models')
module.exports = router

router.get('/:roomId', async (req, res, next) => {
  try {
    console.log('LKJKSDF;LKJAS;DFLKJAS;LDFKJAS;LDKFJ;ASLKDFJA;SLKDFJ')
    const questions = await Question.findAll({
      where: {hashedRoomId: req.params.roomId},
    })
    res.json(questions)
  } catch (err) {
    console.log('error in api/question get route')
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
    question.hashedRoomId = 'deleted'
    question.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
