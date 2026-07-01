import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Button } from "react-native-paper"
import { useSelector } from "react-redux"

import { getShowTimer } from "../../selectors"
import { paperButtonProps } from "../../styles"

const TimerPresentation = () => {
	const [time, setTime] = useState(0)
	const showTimer = useSelector(getShowTimer)
	const tick = () => {
		setTime(time - 1)
	}
	useEffect(() => {
		const timerID = setInterval(() => (time > 0 ? tick() : null), 1000)

		return () => {
			clearInterval(timerID)
		}
	})

	if (showTimer) {
		return (
			<View>
				<Button
					accessibilityLabel={
						time === 0
							? "Timer: expired"
							: time < 10
								? "Timer: warning"
								: "Timer: active"
					}
					onPress={() => {
						setTime(45)
					}}
					{...(time === 0
						? paperButtonProps.timerRed
						: time < 10
							? paperButtonProps.timerYellow
							: paperButtonProps.timerGreen)}
				>
					{time.toString()}
				</Button>
			</View>
		)
	} else {
		return null
	}
}

export default TimerPresentation
