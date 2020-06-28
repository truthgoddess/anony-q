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
    console.log('this is the hashedRoomId', hashedRoomId)
    const {data} = await axios.get(`/api/questions/${hashedRoomId}`)

    console.log(data)
    dispatch(setQuestions(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultQuestions, action) {
  switch (action.type) {
    case SET_QUESTIONS: {
      console.log(action)
      return action.questions
    }

    default:
      return state
  }
}
