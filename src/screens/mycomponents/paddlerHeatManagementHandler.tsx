import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	addOrRemovePaddlerName,
	changePaddler,
	updatePaddlerScores
} from "../../actions"
import { IPaddler } from "../../reducers"
import {
	getNumberOfRuns,
	getPaddlerHeatList,
	getScoresState
} from "../../selectors"
import { styles } from "../../styles"
import { initialScoresheet } from "./makePaddlerScores"

export const PaddlerHeatManagerPresentation = (props: any): any => {
	const dispatch = useDispatch()
	const [currentPaddler, setCurrentPaddler] = useState("")
	const [inputBorder, setInputBorder] = useState("black")
	const paddlerScores = useSelector(getScoresState)
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const handleDeletePaddler =
		(heatKey: number, paddlerList: IPaddler[], paddler: IPaddler) => () => {
			addOrRemovePaddler(
				heatKey,
				paddlerList.filter((e) => e !== paddler)
			)
		}

	const handleAddChange = (newPaddler: IPaddler) => {
		setCurrentPaddler(newPaddler)
		if (paddlerHeatList.flat().indexOf(newPaddler) > -1) {
			setInputBorder("red")
		} else {
			setInputBorder("black")
		}
	}
	const handleAddPaddler =
		(heatKey: number, paddlerList: IPaddler[], newPaddler: IPaddler) =>
		() => {
			if (newPaddler.length === 0) {
				alert("People like having names :)")
			} else {
				if (paddlerHeatList.flat().indexOf(newPaddler) > -1) {
					alert("You've already added this paddler")
				} else {
					batch(() => {
						setCurrentPaddler("")
						addOrRemovePaddler(heatKey, [
							...paddlerList,
							newPaddler
						])
					})
				}
			}
		}
	const addOrRemovePaddler = (
		heatKey: number,
		remainingPaddlers: IPaddler[]
	) => {
		const newList = remainingPaddlers.length === 0 ? [] : remainingPaddlers
		const newPaddlerScores = paddlerScores
		newList.flat().map((paddler) => {
			// @ts-ignore
			if (!newPaddlerScores[paddler]) {
				newPaddlerScores[paddler.toString()] = []
			}

			if (
				numberOfRuns + 1 !==
				// @ts-ignore
				newPaddlerScores[paddler.toString()].length
			) {
				for (let i = 0; i < numberOfRuns + 1; i++) {
					// @ts-ignore
					newPaddlerScores[paddler.toString()].push(
						initialScoresheet()
					)
				}
			}
		})

		const newHeatList = paddlerHeatList
		newHeatList[heatKey] = newList
		batch(() => {
			dispatch(changePaddler(0))
			dispatch(addOrRemovePaddlerName([...newHeatList]))
			dispatch(updatePaddlerScores(newPaddlerScores))
		})
	}

	return (
		<View>
			<View>
				<Text style={styles.heatStyle}>{`Heat ${
					(props.heatKey as number) + 1
				}`}</Text>

				{props.paddlerList.map((paddler: IPaddler, key: number) => (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap"
						}}
						key={key}
					>
						<View style={{ width: "70%" }}>
							<Text
								style={{
									...styles.standardText,
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								{paddler}
							</Text>
						</View>

						<View style={{ width: "30%" }}>
							<Button
								onPress={handleDeletePaddler(
									props.heatKey,
									props.paddlerList,
									paddler
								)}
								title="Delete"
								buttonStyle={styles.deleteButton}
							/>
						</View>
					</View>
				))}
			</View>
			<View>
				<TextInput
					blurOnSubmit={true}
					autoCorrect={false}
					placeholder="New Paddler Name"
					value={currentPaddler}
					onChangeText={handleAddChange}
					onSubmitEditing={handleAddPaddler(
						props.heatKey,
						props.paddlerList,
						currentPaddler
					)}
					clearButtonMode="always"
					style={[
						{
							height: 40,
							borderColor: inputBorder,
							borderWidth: 3,
							padding: 10,
							borderRadius: 3,
							marginHorizontal: 5,
							marginLeft: 4,
							marginRight: 4,
							marginTop: 8
						}
					]}
				/>
			</View>
		</View>
	)
}

export default PaddlerHeatManagerPresentation
