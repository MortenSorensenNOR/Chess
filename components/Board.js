import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "./Background";
import Piece from './Piece'
import { SIZE } from "./Notation";
import { Chess } from "./ChessEngine.js";

function useConst(initialValue) {
	const ref = useRef();
	if (ref.current === undefined) {
		// Box the value in an object so we can tell if it's initialized even if the initializer
		// returns/is undefined
		ref.current = {
		value:
			typeof initialValue === "function"
			? // eslint-disable-next-line @typescript-eslint/ban-types
				(initialValue)()
			: initialValue,
		};
	}
	return ref.current.value;
}

const Board = () => {
	const chess = useConst(() => new Chess())
	const [state, setState] = useState({
		player: "w",
		board: chess.board(),
	});
	const onTurn = useCallback(() => {
		setState({
			player: state.player === "w" ? "b" : "w",
			board: chess.board(),
		});
	}, [chess, state.player]);
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#222" }}>
			<View style={{ width: 8 * SIZE, height: 8 * SIZE }}>
				<Background />
				{
					state.board.map((row, i) => row.map((square, j) => {
						if (square == null) {
							return null
						}
						return <Piece 
								key={`${i}-${j}`} 
								onTurn={onTurn}
                				enabled={state.player === square.color}
								chess={chess} 
								position={{x: j * SIZE, y: i * SIZE}} 
								id={`${square.color}${square.type}`}/>
					}))
				}
			</View>
		</View>
	)
}

export default Board
