const Sequelize = require('sequelize')
const db = require('../db')
const {colors} = require('../../../script/utility/colors')
const {pickRandom} = require('../../../script/utility/colors')

const Question = db.define('question', {
  question: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  hashedRoomId: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: pickRandom(colors),
  },
})

Question.prototype.incLikes = async function () {
  this.likes++
  this.isFavorite(90 / 100)
  this.isTerrible(75 / 100)
  await this.save()
}

Question.prototype.incDislikes = async function () {
  this.dislikes++
  this.isFavorite(90 / 100)
  this.isTerrible(75 / 100)
  await this.save()
}

Question.prototype.isFavorite = function (likePercentageThreshold) {
  if (this.likes > 10) {
    if (this.likes / (this.likes + this.dislikes) > likePercentageThreshold) {
      this.favorite = true
    } else {
      this.favorite = false
    }
  }
}

Question.prototype.isTerrible = async function (dislikePercentageThreshold) {
  if (this.dislikes > 10) {
    if (
      this.dislikes / (this.likes + this.dislikes) >
      dislikePercentageThreshold
    ) {
      await this.destroy()
    }
  }
}

module.exports = Question
