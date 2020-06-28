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

export const fetchQuestions = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/questions') //{host: true} or {hashedRoomId: "dkjl"}
    //should we sort the data here? or in component?
    //Let's give the computer stuff to do, and leave the server out of it
    dispatch(setQuestions(data))
  } catch (err) {
    console.error(err)
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
