'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

let user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  host1,
  host2,
  room1Id,
  room2Id,
  question1,
  question2,
  question3

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  try {
    host1 = await User.create({host: true})
    host2 = await User.create({host: true})
    room1Id = host1.hashedRoomId
    room2Id = host2.hashedRoomId
    user1 = await User.create({hashedRoomId: room1Id})
    user2 = await User.create({hashedRoomId: room1Id})
    user3 = await User.create({hashedRoomId: room1Id})
    user4 = await User.create({hashedRoomId: room2Id})
    user5 = await User.create({hashedRoomId: room2Id})
    user6 = await User.create({hashedRoomId: room2Id})
    user7 = await User.create({hashedRoomId: room2Id})
    question1 = await user1.askQuestion('Why is the sky green?')
    question2 = await user1.askQuestion(
      'Is there anything wrong with a little sun?'
    )
    question3 = await user2.askQuestion('Do you know the nowhere land is fine?')
    await question3.incLikes()
  } catch (error) {
    console.log(error)
  }

  let rooms = [room1Id, room2Id]
  let users = [user1, user2, user3, user4, user5, user6, user7]
  let questions = [question1, question2, question3]

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${rooms.length} rooms`)
  console.log(`seeded ${questions.length} questions`)
  console.log(`liked one question ${question3.likes} times`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
