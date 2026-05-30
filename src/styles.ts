import { StyleSheet, TextStyle, ViewStyle } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	contentContainer: {
		paddingTop: 0
	},
	standardText: {
		fontSize: 20,
		marginLeft: 8,
		marginRight: 8,
		marginTop: 8
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 30,
		marginLeft: 12,
		marginRight: 12,
		marginTop: 12
	}
})

interface PaperButtonProps {
	mode: "contained"
	buttonColor: string
	textColor: string
	style: ViewStyle
	contentStyle: ViewStyle
	labelStyle: TextStyle
	compact: boolean
}

const btn = (
	buttonColor: string,
	textColor: string,
	marginTop: number,
	minHeight: number
): PaperButtonProps => ({
	mode: "contained",
	buttonColor,
	textColor,
	compact: true,
	style: {
		width: "100%",
		marginTop,
		borderRadius: 3
	},
	contentStyle: {
		minHeight,
		paddingHorizontal: 2,
		paddingVertical: 0
	},
	labelStyle: {
		marginHorizontal: 2,
		fontSize: 18
	}
})

export const paperButtonProps = {
	noMove: btn("#4F84C4", "white", 4, 34),
	noBonus: btn("#4F84C4", "white", 3, 28),
	moveScored: btn("#223A5E", "white", 4, 34),
	bonusScored: btn("#223A5E", "white", 3, 28),
	deleteButton: btn("#DC4C46", "white", 4, 34),
	deleteButtonSpaced: btn("#DC4C46", "white", 5, 34),
	timerRed: btn("#DC4C46", "white", 4, 34),
	timerYellow: btn("#F6D155", "#000000", 4, 34),
	timerGreen: btn("#92B558", "white", 4, 34),
	changeButton: btn("#D2691E", "white", 4, 34)
}

