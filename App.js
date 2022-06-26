import React, { Component } from 'react'

import Board from './components/Board'

export class App extends Component {
	render() {
		return (
			<Board style={{ width: "100%", height: "100%" }}/>
		)
	}
}

export default App
