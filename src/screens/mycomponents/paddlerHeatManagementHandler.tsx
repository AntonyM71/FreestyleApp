import _ from "lodash"
import React, { useMemo, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Button, HelperText, Menu, TextInput } from "react-native-paper"
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
	const [openCategoryMenuFor, setOpenCategoryMenuFor] = useState<string | null>(null)
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

	const getCategoryLabel = (currentCategory: string) =>
		currentCategory.length > 0 ? currentCategory : "Select a Category"

	return (
		<View style={layoutStyles.heatContent}>
			<View style={layoutStyles.heatHeaderWrap}>
				<Text style={layoutStyles.heatHeaderText}>{`Heat ${props.heatKey}`}</Text>
			</View>

			{props.paddlerList.map((paddler: IPaddler, key: number) => (
				<View
					style={layoutStyles.paddlerSubCard}
					key={key}
				>
					<View style={layoutStyles.paddlerInfoCell}>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={layoutStyles.paddlerNameText}
						>
							{paddler.name}
						</Text>
						<Button
							onPress={handleDeletePaddler(
								props.heatKey,
								props.paddlerList,
								paddler
							)}
							{...paperButtonProps.deleteButtonSpaced}
							contentStyle={{ minHeight: 48 }}
						>
							{"Delete"}
						</Button>
					</View>
					<View style={layoutStyles.pickerCell}>
						<Menu
							visible={openCategoryMenuFor === paddler.name}
							onDismiss={() => setOpenCategoryMenuFor(null)}
							anchor={
								<Pressable
									testID="category-picker"
									onPress={() => setOpenCategoryMenuFor(paddler.name)}
									style={layoutStyles.categoryDropdownButton}
								>
									<Text style={layoutStyles.categoryFloatingLabel}>{"Category"}</Text>
									<View style={layoutStyles.categoryDropdownRow}>
										<Text
											numberOfLines={1}
											ellipsizeMode="tail"
											style={layoutStyles.categoryDropdownText}
										>
											{getCategoryLabel(paddler.category)}
										</Text>
										<Text style={layoutStyles.categoryDropdownArrow}>{"\u25BE"}</Text>
									</View>
								</Pressable>
							}
						>
							<Menu.Item
								testID={`category-option-none-${paddler.name}`}
								onPress={() => {
									handleCategoryChange(paddler.name, "")
									setOpenCategoryMenuFor(null)
								}}
								title="Select a Category"
							/>
							{pickerCategoryNames.map((categoryName) => (
								<Menu.Item
									key={categoryName + paddler.name}
									testID={`category-option-${categoryName}-${paddler.name}`}
									onPress={() => {
										handleCategoryChange(paddler.name, categoryName)
										setOpenCategoryMenuFor(null)
									}}
									title={categoryName}
								/>
							))}
						</Menu>
					</View>
				</View>
			))}
			<View style={layoutStyles.addPaddlerCard}>
				<Text style={layoutStyles.addPaddlerHeader}>{`Add Paddler to Heat ${props.heatKey}`}</Text>
				<TextInput
					style={layoutStyles.paddlerInput}
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

const layoutStyles = StyleSheet.create({
	heatContent: {
		paddingTop: 0,
		paddingBottom: 8
	},
	heatHeaderWrap: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#F5F7FA",
		borderBottomColor: "#E8EBEF",
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 8
	},
	heatHeaderText: {
		...styles.headerText,
		fontSize: 22,
		marginTop: 0,
		marginBottom: 0,
		color: "#1F2937"
	},
	paddlerSubCard: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-end",
		backgroundColor: "#FFFFFF",
		borderColor: "#E5E7EB",
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 6,
		marginHorizontal: 8,
		marginBottom: 8
	},
	paddlerInfoCell: {
		width: "42%",
		justifyContent: "flex-end"
	},
	paddlerNameText: {
		...styles.standardText,
		marginTop: 2,
		marginBottom: 2,
		fontSize: 17,
		color: "#111827"
	},
	pickerCell: {
		width: "58%",
		paddingHorizontal: 2,
		justifyContent: "flex-end"
	},
	categoryDropdownButton: {
		width: "100%",
		justifyContent: "center",
		borderColor: "#C7CDD6",
		borderWidth: 1,
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 8,
		backgroundColor: "#FFFFFF",
		position: "relative"
	},
	categoryFloatingLabel: {
		position: "absolute",
		top: -8,
		left: 8,
		paddingHorizontal: 4,
		backgroundColor: "#FFFFFF",
		fontSize: 12,
		color: "#6B7280"
	},
	categoryDropdownRow: {
		minHeight: 29,
		flexDirection: "row",
		alignItems: "center"
	},
	categoryDropdownText: {
		flex: 1,
		fontSize: 16,
		color: "#111827"
	},
	categoryDropdownArrow: {
		fontSize: 14,
		color: "#6B7280",
		marginLeft: 8
	},
	addPaddlerCard: {
		backgroundColor: "#FFFFFF",
		borderColor: "#E5E7EB",
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingTop: 6,
		paddingBottom: 4,
		marginHorizontal: 8
	},
	addPaddlerHeader: {
		...styles.headerText,
		fontSize: 20,
		marginTop: 4,
		marginBottom: 6,
		color: "#1F2937"
	},
	paddlerInput: {
		backgroundColor: "#FFFFFF"
	}
})

export default PaddlerHeatManagerPresentation
