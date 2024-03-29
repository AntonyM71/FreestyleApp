import { Platform, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	contentContainer: {
		paddingTop: Platform.OS === "ios" ? 0 : 30
	},
	noMove: {
		backgroundColor: "#4F84C4",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 15
	},
	noBonus: {
		backgroundColor: "#4F84C4",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 4
	},
	moveScored: {
		backgroundColor: "#223A5E",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 15
	},
	bonusScored: {
		backgroundColor: "#223A5E",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 4
	},
	deleteButton: {
		backgroundColor: "#DC4C46",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8
	},
	timerRed: {
		backgroundColor: "#DC4C46",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8
	},
	timerYellow: {
		backgroundColor: "#F6D155",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8
	},
	timerGreen: {
		backgroundColor: "#92B558",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8
	},
	changeButton: {
		backgroundColor: "#D2691E",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 8
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
	},
	heatStyle: {
		textAlign: "center",
		alignItems: "center",
		fontSize: 25,
		paddingVertical: 4
	}
})
