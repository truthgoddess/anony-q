import axios from 'axios'
import socket from '../socket'
/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {host: false, userId: null, hashedRoomId: ''}

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({type: SET_USER, user})

/**
 * THUNK CREATORS
 */

export const joinRoom = (hostOrRoomIdObj) => async (dispatch) => {
  try {
    const {data} = await axios.post('/auth/', hostOrRoomIdObj) //{host: true} or {hashedRoomId: "dkjl"}
    socket.emit('message', data.hashedRoomId)
    dispatch(setUser(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}
