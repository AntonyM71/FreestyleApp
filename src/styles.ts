import { Platform, StyleSheet, ViewStyle } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	contentContainer: {
		paddingTop: Platform.OS === "ios" ? 0 : 30
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
}

const btn = (
	buttonColor: string,
	textColor: string,
	marginTop: number
): PaperButtonProps => ({
	mode: "contained",
	buttonColor,
	textColor,
	style: { marginLeft: 4, marginRight: 4, marginTop }
})

export const paperButtonProps = {
	noMove: btn("#4F84C4", "white", 15),
	noBonus: btn("#4F84C4", "white", 4),
	moveScored: btn("#223A5E", "white", 15),
	bonusScored: btn("#223A5E", "white", 4),
	deleteButton: btn("#DC4C46", "white", 8),
	deleteButtonWithPadding: btn("#DC4C46", "white", 10),
	timerRed: btn("#DC4C46", "white", 8),
	timerYellow: btn("#F6D155", "#000000", 8),
	timerGreen: btn("#92B558", "white", 8),
	changeButton: btn("#D2691E", "white", 8)
}

