import { Position } from "./ChessEngine.js";
import { Dimensions } from "react-native";
import { Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const SIZE = width / 8;

export const toTranslation = (to) => {
	"worklet";
	const tokens = to.split("")
	const col = tokens[0]
	const row = tokens[1]
	if (!col || !row) {
		throw new Error("Invalid notation: " + to)
	}

	const indecies = {
		x: col.charCodeAt(0) - "a".charCodeAt(0),
		y: parseInt(row, 10) - 1
	}
	
	return {
		x: indecies.x * SIZE,
		y: 7 * SIZE - indecies.y * SIZE
	}
}

export const toPosition = (position) => {
	"worklet";
	const col = String.fromCharCode(97 + Math.round(position.x / SIZE))
	const row = `${8 - Math.round(position.y / SIZE)}`
	return `${col}${row}`
}