import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { addOrRemoveCategory, addOrRemovePaddlerName } from "../../actions"
import { ICategory } from "../../reducers"
import { getCategories, getPaddlerHeatList } from "../../selectors"
import { styles } from "../../styles"
import MoveSelection from "./enabledMoves"

export const PaddlerHeatManagerPresentation = () => {
	const dispatch = useDispatch()
	const [newCategory, setNewCategory] = useState("")
	const [inputBorder, setInputBorder] = useState("black")
	const categoryList = useSelector(getCategories)
	const paddlerList = useSelector(getPaddlerHeatList)

	const handleAddChange = (newCategoryName: string) => {
		setNewCategory(newCategoryName)
		if (categoryList.map((p) => p.name).indexOf(newCategoryName) > -1) {
			setInputBorder("red")
		} else {
			setInputBorder("black")
		}
	}
	const handleAddCategory = (newCategoryName: string) => {
		if (inputBorder === "black") {
			const newCategoryList: ICategory[] = [
				...categoryList,
				{
					name: newCategoryName,
					availableMoves: { hole: true, wave: true, nfl: false }
				}
			]
			setNewCategory("")
			dispatch(addOrRemoveCategory(newCategoryList))
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
		dispatch(addOrRemoveCategory(newCategoryList))
		dispatch(addOrRemovePaddlerName(newPaddlerList))
	}

	return (
		<View>
			<View
				style={{
					flex: 1,

					borderBottomColor: "lightgray",
					borderBottomWidth: 2,
					paddingBottom: 5
				}}
			>
				{categoryList.map((category: ICategory, key: number) => (
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
						<View style={{ width: "70%" }}>
							<Text
								style={{
									...styles.standardText,
									justifyContent: "space-around",
									alignItems: "center"
								}}
							>
								{category.name}
							</Text>
						</View>

						<View style={{ width: "30%" }}>
							<Button
								onPress={() =>
									handleDeleteCategory(category.name)
								}
								title="Delete"
								buttonStyle={styles.deleteButton}
							/>
						</View>

						<View style={{ width: "100%" }}>
							<MoveSelection category={category} />
						</View>
					</View>
				))}
			</View>
			<View
				style={{
					borderBottomColor: "lightgray",
					borderBottomWidth: 1
				}}
			>
				<Text
					style={{
						...styles.headerText,
						justifyContent: "space-around",
						alignItems: "center",
						borderTopColor: "lightgray",
						borderTopWidth: 1,
						paddingBottom: 5
					}}
				>
					{"Add New Category"}
				</Text>

				<TextInput
					blurOnSubmit={true}
					autoCorrect={false}
					placeholder="New Category Name"
					value={newCategory}
					onChangeText={handleAddChange}
					onSubmitEditing={() => handleAddCategory(newCategory)}
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
