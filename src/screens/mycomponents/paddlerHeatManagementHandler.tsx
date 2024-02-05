import { Picker } from "@react-native-picker/picker"
import _ from "lodash"
import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import {
	addOrRemovePaddlerName,
	changePaddler,
	updatePaddlerScores
} from "../../actions"
import { IPaddler } from "../../reducers"
import {
	getCategories,
	getNumberOfRuns,
	getPaddlerHeatList,
	getScoresState
} from "../../selectors"
import { styles } from "../../styles"
import { initialScoresheet } from "./makePaddlerScores"

interface PropsType {
	paddlerList: IPaddler[]
	heatKey: number
}
export const PaddlerHeatManagerPresentation = (props: PropsType) => {
	const dispatch = useDispatch()
	const [newPaddler, setNewPaddler] = useState("")
	const [inputBorder, setInputBorder] = useState("black")
	const paddlerScores = useSelector(getScoresState)
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const availableCategories = useSelector(getCategories)

	const handleDeletePaddler =
		(heatKey: number, paddlerList: IPaddler[], paddler: IPaddler) => () => {
			addOrRemovePaddler(
				heatKey,
				paddlerList.filter((e) => e !== paddler)
			)
		}

	const handleAddChange = (newPaddlerName: string) => {
		setNewPaddler(newPaddlerName)
		if (
			paddlerHeatList
				.flat()
				.map((p) => p.name)
				.indexOf(newPaddlerName) > -1
		) {
			setInputBorder("red")
		} else {
			setInputBorder("black")
		}
	}
	const handleAddPaddler =
		(heatKey: number, paddlerList: IPaddler[], newPaddlerName: string) =>
		() => {
			if (newPaddlerName.length === 0) {
				alert("People like having names :)")
			} else {
				if (
					paddlerHeatList
						.flat()
						.map((p) => p.name)
						.indexOf(newPaddlerName) > -1
				) {
					alert("You've already added this paddler")
				} else {
					setNewPaddler("")
					addOrRemovePaddler(heatKey, [
						...paddlerList,
						{
							name: newPaddlerName,
							category: "",
							heat: heatKey
						}
					])
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
				newPaddlerScores[paddler.name] = []
			}

			if (
				numberOfRuns + 1 !==
				// @ts-ignore
				newPaddlerScores[paddler.name].length
			) {
				for (let i = 0; i < numberOfRuns + 1; i++) {
					// @ts-ignore
					newPaddlerScores[paddler.name].push(initialScoresheet())
				}
			}
		})
		const paddlersInOtherHeats = paddlerHeatList.filter(
			(p) => p.heat !== heatKey
		)
		const newHeatList = [...paddlersInOtherHeats, ...newList]

		dispatch(changePaddler(0))
		dispatch(addOrRemovePaddlerName([...newHeatList]))
		dispatch(updatePaddlerScores(newPaddlerScores))
	}

	const handleCategoryChange = (paddlerName: string, newCategory: string) => {
		const changedPaddlerIndex = paddlerHeatList.findIndex(
			(p) => p.name === paddlerName
		)
		if (
			newCategory !== "" &&
			newCategory !== paddlerHeatList[changedPaddlerIndex].category
		) {
			const newPaddlerList = _.cloneDeep(paddlerHeatList)
			const newPaddlerScores = _.cloneDeep(paddlerScores)

			newPaddlerList[changedPaddlerIndex].category = newCategory

			newPaddlerScores[paddlerName] = [initialScoresheet()]

			dispatch(addOrRemovePaddlerName([...newPaddlerList]))
			dispatch(updatePaddlerScores(newPaddlerScores))
		}
	}

	return (
		<View>
			<View>
				<Text style={styles.headerText}>{`Heat ${props.heatKey}`}</Text>

				{props.paddlerList.map((paddler: IPaddler, key: number) => (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							borderBottomColor: "gray",
							borderBottomWidth: 1,
							paddingBottom: 5
						}}
						key={key}
					>
						<View style={{ width: "40%" }}>
							<Text
								style={{
									...styles.standardText,
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								{paddler.name}
							</Text>
							<Button
								onPress={handleDeletePaddler(
									props.heatKey,
									props.paddlerList,
									paddler
								)}
								title="Delete"
								buttonStyle={styles.deleteButton}
								style={{ paddingTop: 10 }}
							/>
						</View>
						<View style={{ width: "60%" }}>
							<Picker
								selectedValue={paddler.category}
								mode="dropdown"
								onValueChange={(itemValue) =>
									handleCategoryChange(
										paddler.name,
										itemValue
									)
								}
								// style={{ height: 88 }}
							>
								<Picker.Item
									key={"default"}
									label={"Select a Category"}
									value={""}
									enabled={false}
								/>
								{availableCategories.map((category) => (
									<Picker.Item
										key={category.name + paddler.name}
										label={category.name}
										value={category.name}
									/>
								))}
							</Picker>
						</View>
						<View style={{ width: "20%" }}></View>
					</View>
				))}
			</View>
			<View>
				<TextInput
					blurOnSubmit={true}
					autoCorrect={false}
					placeholder="New Paddler Name"
					value={newPaddler}
					onChangeText={handleAddChange}
					onSubmitEditing={handleAddPaddler(
						props.heatKey,
						props.paddlerList,
						newPaddler
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
