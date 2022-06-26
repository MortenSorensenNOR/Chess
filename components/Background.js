import React, { Component } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { Dimensions } from 'react-native'

const WHITE = "rgb(100, 133, 68)"
const BLACK = "rgb(230, 233, 198)"

const Square = (props) => {
	const backgroundColor = (props.row + props.col + 1) % 2 === 0 ? WHITE : BLACK
	const color = (props.row + props.col + 1) % 2 === 0 ? BLACK : WHITE 
	return (
		<View style={{ flex: 1, backgroundColor, padding: 2, justifyContent: 'space-between' }}>
			<Text style={{ color, fontSize: 10, fontWeight: "500", opacity: props.col == 0 ? 1 : 0}}>{8 - props.row}</Text>
			<Text style={{ color, fontSize: 10, fontWeight: "500", alignSelf: 'flex-end', opacity: props.row == 7 ? 1 : 0 }}>{String.fromCharCode("a".charCodeAt(0) + props.col)}</Text>
		</View>
	);
};

const Row = (props) => {
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			{new Array(8).fill(0).map((_, i) => (
				<Square row={props.row} col={i} key={i} />
			))}
		</View>
	);
};

const Background = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' }}>
			<View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }}>
				{
					new Array(8).fill(0).map((_, i) => (
						<Row key={i} row={i} />
					))
				}
			</View>
		</View>
	);
};

export default Background;