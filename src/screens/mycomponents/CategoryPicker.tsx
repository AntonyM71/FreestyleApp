import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Menu } from "react-native-paper"

interface CategoryPickerProps {
	currentCategory: string
	categoryNames: string[]
	onSelectCategory: (categoryName: string) => void
	pickerTestID?: string
	getNoneOptionTestID?: () => string
	getOptionTestID?: (categoryName: string) => string
}

const CategoryPicker = ({
	currentCategory,
	categoryNames,
	onSelectCategory,
	pickerTestID = "category-picker",
	getNoneOptionTestID,
	getOptionTestID
}: CategoryPickerProps) => {
	const [menuVisible, setMenuVisible] = useState(false)
	const categoryLabel =
		currentCategory.length > 0 ? currentCategory : "Select a Category"

	return (
		<Menu
			visible={menuVisible}
			onDismiss={() => setMenuVisible(false)}
			anchor={
				<Pressable
					testID={pickerTestID}
					onPress={() => setMenuVisible(true)}
					style={layoutStyles.categoryDropdownButton}
				>
					<Text style={layoutStyles.categoryFloatingLabel}>{"Category"}</Text>
					<View style={layoutStyles.categoryDropdownRow}>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={layoutStyles.categoryDropdownText}
						>
							{categoryLabel}
						</Text>
						<Text style={layoutStyles.categoryDropdownArrow}>{"\u25BE"}</Text>
					</View>
				</Pressable>
			}
		>
			<Menu.Item
				testID={
					getNoneOptionTestID
						? getNoneOptionTestID()
						: "category-option-none"
				}
				onPress={() => {
					onSelectCategory("")
					setMenuVisible(false)
				}}
				title="Select a Category"
			/>
			{categoryNames.map((categoryName) => (
				<Menu.Item
					key={categoryName}
					testID={
						getOptionTestID
							? getOptionTestID(categoryName)
							: `category-option-${categoryName}`
					}
					onPress={() => {
						onSelectCategory(categoryName)
						setMenuVisible(false)
					}}
					title={categoryName}
				/>
			))}
		</Menu>
	)
}

const layoutStyles = StyleSheet.create({
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
		marginLeft: 8,
		fontSize: 14,
		color: "#6B7280"
	}
})

export default CategoryPicker
