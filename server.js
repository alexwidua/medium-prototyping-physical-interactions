const server = require('http').createServer()
const port = process.env.PORT || 3000

// Initialize a socket server instance
const io = require('socket.io')(server, {
	// Handle Cross-origin resource sharing, don't worry about that
	// https://socket.io/docs/v4/handling-cors/
	cors: {
		origin: '*'
	}
})

const { Board, Sensor } = require('johnny-five')
const board = new Board()

board.on('ready', () => {
	const poti = new Sensor('A0')

	poti.on('change', () => {
		const { raw } = poti
		console.log('Value: ' + raw)

		// Broadcast a custom 'poti_change' event everytime the value changes
		// The event has the Poti value as argument
		// https://socket.io/docs/v4/broadcasting-events/
		io.emit('poti_change', raw)
	})
})

server.listen(port, () => {
	console.log('Server started.')
	console.log('Listening on port:' + port)
})
