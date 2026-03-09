import { Picker } from "@react-native-picker/picker"
import _ from "lodash"
import React, { useMemo, useState } from "react"
import { Platform, Text, View } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import { batch, useDispatch, useSelector } from "react-redux"
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
import { paperButtonProps, styles } from "../../styles"
import { initialScoresheet } from "./makePaddlerScores"

interface PropsType {
	paddlerList: IPaddler[]
	heatKey: number
}
export const PaddlerHeatManagerPresentation = (props: PropsType) => {
	const dispatch = useDispatch()
	const [newPaddler, setNewPaddler] = useState("")
	const [isDuplicate, setIsDuplicate] = useState(false)
	const paddlerScores = useSelector(getScoresState)
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const availableCategories = useSelector(getCategories)

	const pickerCategoryNames = useMemo(() => {
		const configuredCategoryNames = availableCategories
			.map((category) => category.name)
			.filter((name) => name.length > 0)

		if (configuredCategoryNames.length > 0) {
			return configuredCategoryNames
		}

		return Array.from(
			new Set(
				paddlerHeatList
					.map((paddler) => paddler.category)
					.filter((name) => name.length > 0)
			)
		)
	}, [availableCategories, paddlerHeatList])

	const handleDeletePaddler =
		(heatKey: number, paddlerList: IPaddler[], paddler: IPaddler) => () => {
			addOrRemovePaddler(
				heatKey,
				paddlerList.filter((e) => e !== paddler)
			)
		}

	const handleAddChange = (newPaddlerName: string) => {
		setNewPaddler(newPaddlerName)
		setIsDuplicate(
			paddlerHeatList
				.flat()
				.map((p) => p.name)
				.indexOf(newPaddlerName) > -1
		)
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
					batch(() => {
						setNewPaddler("")
						addOrRemovePaddler(heatKey, [
							...paddlerList,
							{
								name: newPaddlerName,
								category: "",
								heat: heatKey
							}
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
		batch(() => {
			dispatch(changePaddler(0))
			dispatch(addOrRemovePaddlerName([...newHeatList]))
			dispatch(updatePaddlerScores(newPaddlerScores))
		})
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

			batch(() => {
				dispatch(addOrRemovePaddlerName([...newPaddlerList]))
				dispatch(updatePaddlerScores(newPaddlerScores))
			})
		}
	}

	return (
		<View>
			<View style={{ borderTopColor: "lightgray", borderTopWidth: 2 }}>
				<Text style={styles.headerText}>{`Heat ${props.heatKey}`}</Text>

				{props.paddlerList.map((paddler: IPaddler, key: number) => (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							borderTopColor: "lightgray",
							borderTopWidth: 1,
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
								{...paperButtonProps.deleteButtonWithPadding}
							>
								{"Delete"}
							</Button>
						</View>
						<View style={{ width: "60%" }}>
							<Picker
								selectedValue={paddler.category}
								mode={
									Platform.OS === "android"
										? "dropdown"
										: undefined
								}
								testID="category-picker"
								style={{
									width: "100%",
									minHeight: 48,
									color: "black"
								}}
								itemStyle={{ color: "black" }}
								onValueChange={(itemValue) =>
									handleCategoryChange(
										paddler.name,
										String(itemValue)
									)
								}
							>
								<Picker.Item
									key={"default"}
									label={"Select a Category"}
									value={""}
									enabled={true}
									color={"black"}
								/>
								{pickerCategoryNames.map((categoryName) => (
									<Picker.Item
										key={categoryName + paddler.name}
										label={categoryName}
										value={categoryName}
										color={"black"}
									/>
								))}
							</Picker>
						</View>
						<View style={{ width: "20%" }}></View>
					</View>
				))}
			</View>
			<View style={{ borderTopColor: "lightgray", borderTopWidth: 1 }}>
				<Text
					style={styles.headerText}
				>{`Add Paddler to Heat ${props.heatKey}`}</Text>
				<TextInput
					mode="outlined"
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
					error={isDuplicate}
				/>
				<HelperText type="error" visible={isDuplicate}>
					{"Paddler already exists"}
				</HelperText>
			</View>
		</View>
	)
}

export default PaddlerHeatManagerPresentation
