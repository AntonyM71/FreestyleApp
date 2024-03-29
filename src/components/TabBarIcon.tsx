import { Ionicons } from "@expo/vector-icons"
import React from "react"
import Colors from "../constants/Colors"

export default class TabBarIcon extends React.Component {
	props: {
		name: string
		focused: boolean
	}
	render() {
		return (
			<Ionicons
				name={this.props.name}
				size={26}
				style={{ marginBottom: -3 }}
				color={
					this.props.focused
						? Colors.tabIconSelected
						: Colors.tabIconDefault
				}
			/>
		)
	}
}
