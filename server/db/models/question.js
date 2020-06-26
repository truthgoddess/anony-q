const Sequelize = require('sequelize')
const db = require('../db')

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
})

Question.prototype.incLikes = function () {
  this.likes++
  this.isFavorite(90 / 100)
}

Question.prototype.incDislikes = function () {
  this.dislikes++
  this.isFavorite(90 / 100)
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

module.exports = Question
