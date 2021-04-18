import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import socketIOClient from 'socket.io-client'

// Set local IP to make dev server externally accessible
const socketSrv = 'localhost:3000'
const socket = socketIOClient(socketSrv)

function App() {
	const [value, setValue] = useState(0)

	useEffect(() => {
		socket.on('poti_change', (value) => {
			setValue(value)
		})
	})

	const circleWrapper = {
		background: '#000',
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}

	const circleDisplay = {
		width: '400px',
		height: '400px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all .2s',
		borderRadius: '100%',
		transition: 'all 0.35s',
		backgroundImage: `conic-gradient(from 0deg at 50% 50%, #ffffff 0deg, #ffffff ${
			value / 2
		}deg, #1E1E1E ${value / 2}deg, #1E1E1E 360deg)`
	}

	const innerCircle = {
		width: '300px',
		height: '300px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#1E1E1E',
		borderRadius: '100%',
		color: '#fff',
		fontSize: '48px'
	}

	return (
		<div style={circleWrapper}>
			<div style={circleDisplay}>
				<div style={innerCircle}>{value}</div>
			</div>
		</div>
	)
}

export default App

render(<App />, document.getElementById('root'))
