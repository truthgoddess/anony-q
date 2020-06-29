const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.body.host) {
      const user = await User.create({host: req.body.host})
      res.json({
        hashedRoomId: user.hashedRoomId,
        id: user.id,
        host: user.host,
      })
    } else if (req.body.hashedRoomId) {
      const user = await User.create({hashedRoomId: req.body.hashedRoomId})
      res.json({
        hashedRoomId: user.hashedRoomId,
        id: user.id,
        host: user.host,
      })
    } else {
      res.send("the body didn't contain the right information")
    }
  } catch (error) {
    next(error)
  }
})

router.post('/ask/:userId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId)
    await user.askQuestion(req.body.question, req.body.color)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}})
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else if (!user.correctPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)))
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/signup', async (req, res, next) => {
//   try {
//     const user = await User.create(req.body)
//     req.login(user, err => (err ? next(err) : res.json(user)))
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists')
//     } else {
//       next(err)
//     }
//   }
// })

// router.post('/logout', (req, res) => {
//   req.logout()
//   req.session.destroy()
//   res.redirect('/')
// })

// router.get('/me', (req, res) => {
//   res.json(req.user)
// })

// router.use('/google', require('./google'))
