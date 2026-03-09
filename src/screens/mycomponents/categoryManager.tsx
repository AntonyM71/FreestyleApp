import React, { useState } from "react"
import { Text, View } from "react-native"
import { Button, Input } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import { addOrRemoveCategory, addOrRemovePaddlerName } from "../../actions"
import { ICategory } from "../../reducers"
import { getCategories, getPaddlerHeatList } from "../../selectors"
import { styles } from "../../styles"
import MoveSelection from "./enabledMoves"

export const PaddlerHeatManagerPresentation = () => {
	const dispatch = useDispatch()
	const [newCategory, setNewCategory] = useState("")
	const [isDuplicate, setIsDuplicate] = useState(false)
	const categoryList = useSelector(getCategories)
	const paddlerList = useSelector(getPaddlerHeatList)

	const handleAddChange = (newCategoryName: string) => {
		setNewCategory(newCategoryName)
		setIsDuplicate(categoryList.map((p) => p.name).indexOf(newCategoryName) > -1)
	}
	const handleAddCategory = (newCategoryName: string) => {
		if (!isDuplicate) {
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
		batch(() => {
			dispatch(addOrRemoveCategory(newCategoryList))
			dispatch(addOrRemovePaddlerName(newPaddlerList))
		})
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

				<Input
					blurOnSubmit={true}
					autoCorrect={false}
					placeholder="New Category Name"
					value={newCategory}
					onChangeText={handleAddChange}
					onSubmitEditing={() => handleAddCategory(newCategory)}
					clearButtonMode="always"
					errorMessage={isDuplicate ? "Category already exists" : undefined}
				/>
			</View>
		</View>
	)
}

export default PaddlerHeatManagerPresentation
