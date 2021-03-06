import axios from 'axios'
const {colors, pickRandom} = require('../../script/utility/colors')
import socket from '../socket'

/**
 * ACTION TYPES
 */
const SET_QUESTIONS = 'SET_QUESTIONS'

/**
 * INITIAL STATE
 */
const defaultQuestions = []

/**
 * ACTION CREATORS
 */
const setQuestions = (questions) => ({type: SET_QUESTIONS, questions})

/**
 * THUNK CREATORS
 */

export const fetchQuestions = (hashedRoomId) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/questions/${hashedRoomId}`)
    data.sort((a, b) => b.likes - a.likes)
    dispatch(setQuestions(data))
  } catch (error) {
    console.log(error)
  }
}

export const likeQuestion = (questionId) => async () => {
  try {
    await axios.put(`/api/questions/like/${questionId}`)
  } catch (error) {
    console.log(error)
  }
}

export const addQuestion = (userId, question) => async () => {
  const color = pickRandom(colors)
  try {
    await axios.post(`/auth/ask/${userId}`, {question, color})
  } catch (error) {
    console.log(error)
  }
}

export const dislikeQuestion = (questionId) => async () => {
  try {
    await axios.put(`/api/questions/dislike/${questionId}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuestion = (questionId) => async () => {
  try {
    await axios.delete(`/api/questions/delete/${questionId}`)
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultQuestions, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return action.questions
    default:
      return state
  }
}
