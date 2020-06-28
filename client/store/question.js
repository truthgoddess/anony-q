import axios from 'axios'

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
  try {
    await axios.post(`/auth/ask/${userId}`, {question})
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
    await axios.delete(`/api/questions/dislike/${questionId}`)
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
