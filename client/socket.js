import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('authorized', data => {
  console.log('WE GOT SOME DATA ON FRONT END: ', data)
})

export default socket
