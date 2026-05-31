import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import { batch, useDispatch, useSelector } from "react-redux"
import { addOrRemoveCategory, addOrRemovePaddlerName } from "../../actions"
import { ICategory } from "../../reducers"
import { getCategories, getPaddlerHeatList } from "../../selectors"
import { paperButtonProps, styles } from "../../styles"
import MoveSelection from "./enabledMoves"

export const PaddlerHeatManagerPresentation = () => {
	const dispatch = useDispatch()
	const [newCategory, setNewCategory] = useState("")
	const [isDuplicate, setIsDuplicate] = useState(false)
	const categoryList = useSelector(getCategories)
	const paddlerList = useSelector(getPaddlerHeatList)

	const handleAddChange = (newCategoryName: string) => {
		const trimmedName = newCategoryName.trim()
		setNewCategory(newCategoryName)
		setIsDuplicate(categoryList.map((p) => p.name).indexOf(trimmedName) > -1)
	}
	const handleAddCategory = (newCategoryName: string) => {
		const trimmedName = newCategoryName.trim()

		// Validate input: not empty, not duplicate, within max length
		if (trimmedName.length === 0) {
			alert("Category name cannot be empty")

			return
		}

		if (trimmedName.length > 50) {
			alert("Category name too long (max 50 characters)")

			return
		}

		if (!isDuplicate) {
			const newCategoryList: ICategory[] = [
				...categoryList,
				{
					name: trimmedName,
					availableMoves: { hole: true, wave: true, nfl: false }
				}
			]
			setNewCategory("")
			dispatch(addOrRemoveCategory(newCategoryList))
		} else {
			alert("Category name already exists")
		}
	}
	const handleDeleteCategory = (removedCategoryName: string) => {
		const newCategoryList: ICategory[] = categoryList.filter(
			(c) => c.name !== removedCategoryName
		)

		// remove category association from paddlers in deleted category list

		const newPaddlerList = paddlerList.map((p) => {
			if (p.category === removedCategoryName) {
				return { ...p, category: "" }
			} else {
				return p
			}
		})
		batch(() => {
			dispatch(addOrRemoveCategory(newCategoryList))
			dispatch(addOrRemovePaddlerName(newPaddlerList))
		})
	}

	return (
		<View>
			<View style={layoutStyles.categoryListWrap}>
				{categoryList.map((category: ICategory, key: number) => (
					<View
						style={layoutStyles.categoryCard}
						key={key}
					>
						<View style={layoutStyles.categoryHeaderRow}>
							<View style={layoutStyles.categoryNameWrap}>
							<Text
								style={layoutStyles.categoryNameText}
							>
								{category.name}
							</Text>
							</View>
							<View style={layoutStyles.deleteButtonWrap}>
							<Button
								onPress={() =>
									handleDeleteCategory(category.name)
								}
								{...paperButtonProps.deleteButton}
							>
								{"Delete"}
							</Button>
						</View>
						</View>

						<View style={layoutStyles.movesWrap}>
							<MoveSelection category={category} />
						</View>
					</View>
				))}
			</View>
			<View style={layoutStyles.addCategoryCard}>
				<Text
					style={layoutStyles.addCategoryHeader}
				>
					{"Add New Category"}
				</Text>

				<TextInput
					style={layoutStyles.categoryInput}
					mode="outlined"
					autoCorrect={false}
					placeholder="New Category Name"
					value={newCategory}
					onChangeText={handleAddChange}
					onSubmitEditing={() => handleAddCategory(newCategory)}
					clearButtonMode="always"
					error={isDuplicate}
				/>
				<HelperText type="error" visible={isDuplicate}>
					{"Category already exists"}
				</HelperText>
			</View>
		</View>
	)
}

const layoutStyles = StyleSheet.create({
	categoryListWrap: {
		paddingTop: 4
	},
	categoryCard: {
		backgroundColor: "#F9FAFB",
		borderColor: "#E5E7EB",
		borderWidth: 1,
		borderRadius: 6,
		marginBottom: 8,
		paddingHorizontal: 8,
		paddingVertical: 6
	},
	categoryHeaderRow: {
		flexDirection: "row",
		alignItems: "center"
	},
	categoryNameWrap: {
		width: "70%"
	},
	categoryNameText: {
		...styles.standardText,
		marginTop: 2,
		fontSize: 18,
		fontWeight: "500",
		color: "#1F2937"
	},
	deleteButtonWrap: {
		width: "30%"
	},
	movesWrap: {
		width: "100%"
	},
	addCategoryCard: {
		marginTop: 4,
		paddingTop: 4,
		paddingBottom: 8
	},
	addCategoryHeader: {
		...styles.headerText,
		fontSize: 22,
		marginTop: 6,
		marginBottom: 6,
		color: "#1F2937"
	},
	categoryInput: {
		backgroundColor: "#FFFFFF"
	}
})

export default PaddlerHeatManagerPresentation
