import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useSelector } from "react-redux"
import { getShowTimer } from "../../selectors"
import { styles } from "../../styles"

const timerPresentation = () => {
	const [time, setTime] = useState(0)
	const showTimer = useSelector(getShowTimer)
	useEffect(() => {
		const timerID = setInterval(() => (time > 0 ? tick() : null), 1000)

		return () => {
			clearInterval(timerID)
		}
	})
	const tick = () => {
		setTime(time - 1)
	}

	if (showTimer) {
		return (
			<View>
				<Button
					onPress={() => {
						setTime(45)
					}}
					title={time.toString()}
					buttonStyle={
						time === 0
							? styles.timerRed
							: time < 10
							? styles.timerYellow
							: styles.timerGreen
					}
				/>
			</View>
		)
	} else {
		return null
	}
}

export default timerPresentation
