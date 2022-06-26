import { useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  		runOnJS,
  		useAnimatedGestureHandler,
  		useAnimatedStyle,
  		useSharedValue,
  		withTiming } from "react-native-reanimated";
import { SIZE, toPosition, toTranslation } from "./Notation";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

export const PIECES = {
	br: require("../assets/pieces/br.png"),
	bp: require("../assets/pieces/bp.png"),
	bn: require("../assets/pieces/bn.png"),
	bb: require("../assets/pieces/bb.png"),
	bq: require("../assets/pieces/bq.png"),
	bk: require("../assets/pieces/bk.png"),
	wr: require("../assets/pieces/wr.png"),
	wn: require("../assets/pieces/wn.png"),
	wb: require("../assets/pieces/wb.png"),
	wq: require("../assets/pieces/wq.png"),
	wk: require("../assets/pieces/wk.png"),
	wp: require("../assets/pieces/wp.png"),
};

const Piece = (props) => {
	const isGestureActive = useSharedValue(false)
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)
	const translateX = useSharedValue(props.position.x)
	const translateY = useSharedValue(props.position.y)
	const movePiece = useCallback((from, to) => {
		const moves = props.chess.moves({ verbose: true });
		const move = moves.find((m) => m.from === from && m.to === to);
		const { x, y } = toTranslation(move ? move.to : from);
		translateX.value = withTiming(x)
		translateY.value = withTiming(y, {}, () => {
			isGestureActive.value = false
		})
		if (move) {
			props.chess.move({ from, to });
			props.onTurn();
		}
	}, [props, translateX, translateY, isGestureActive])
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: () => {
			isGestureActive.value = true
			offsetX.value = translateX.value;
			offsetY.value = translateY.value;
		},
		onActive: ({ translationX, translationY }) => {
			translateX.value = offsetX.value + translationX;
			translateY.value = offsetY.value + translationY;
		},
		onEnd: () => {
			const from = toPosition({ x: offsetX.value, y: offsetY.value })
			const to = toPosition({ x: translateX.value, y: translateY.value })
			runOnJS(movePiece)(from, to)
		}
	});
	
	const style = useAnimatedStyle(() => ({
		position: "absolute",
		zIndex: isGestureActive.value ? 100 : 0,
		width: SIZE, 
		height: SIZE,
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));
	const from = useAnimatedStyle(() => {
		const tr = toTranslation(toPosition({ x: translateX.value, y: translateY.value }))
		return {
			backgroundColor: "rgba(255, 255, 0, 0.5)",
			position: "absolute",
			opacity: isGestureActive.value ? 1 : 0,
			zIndex: isGestureActive.value ? 100 : 0,
			width: SIZE, 
			height: SIZE,
			transform: [
				{ translateX: tr.x },
				{ translateY: tr.y },
			],
		}
	}
	)
	const to = useAnimatedStyle(() => ({
		backgroundColor: "rgba(255, 255, 0, 0.5)",
		position: "absolute",
		opacity: isGestureActive.value ? 1 : 0,
		zIndex: isGestureActive.value ? 100 : 0,
		width: SIZE, 
		height: SIZE,
		transform: [
			{ translateX: offsetX.value },
			{ translateY: offsetY.value },
		],
	}))
	return (
		<>
			<Animated.View style={from}/>
			<Animated.View style={to}/>
			<PanGestureHandler onGestureEvent={onGestureEvent} enabled={props.enabled}>
				<Animated.View style={style}>
					<Image source={PIECES[props.id]} style={styles.piece}/>
				</Animated.View>
			</PanGestureHandler>
		</>
	)
}

export default Piece;