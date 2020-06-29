//export this in function that is called?

import io from 'socket.io-client'
import {fetchQuestions, setQuestions} from './store'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('updatetime', async (hashedRoomId) => {
  console.log('this is the room being passed into the dispatch', hashedRoomId)
  await store.dispatch(fetchQuestions(hashedRoomId))
})

export default socket
