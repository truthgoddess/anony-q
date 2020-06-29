module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('joinRoom', (roomId) => {
      console.log('trying to join this room', roomId)
      socket.join(roomId)
    })

    socket.on('everyoneUpdate', (hashedRoomId) => {
      console.log('these are rooms socket is in:', socket.rooms)
      io.sockets.to(hashedRoomId).emit('updatetime', hashedRoomId)
      console.log('update time')
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
