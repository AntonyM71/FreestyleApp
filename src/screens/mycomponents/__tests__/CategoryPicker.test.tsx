import { fireEvent,render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"

import CategoryPicker from "../CategoryPicker"

const safeAreaMetrics = {
	frame: { x: 0, y: 0, width: 320, height: 640 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 }
}

const renderWithProviders = (ui: React.ReactElement) =>
	render(ui, {
		wrapper: ({ children }) => (
			<SafeAreaProvider initialMetrics={safeAreaMetrics}>
				<PaperProvider>{children}</PaperProvider>
			</SafeAreaProvider>
		)
	})

describe("CategoryPicker", () => {
	const CATEGORY_PICKER_TEST_ID = "category-picker"
	const categories = ["Novice", "Intermediate", "Expert"]
	const onSelectCategory = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("shows placeholder text when no category is selected", () => {
		renderWithProviders(
			<CategoryPicker
				currentCategory=""
				categoryNames={categories}
				onSelectCategory={onSelectCategory}
			/>
		)

		expect(screen.getByText("Select a Category")).toBeTruthy()
	})

	it("shows the selected category as a visual indicator", () => {
		renderWithProviders(
			<CategoryPicker
				currentCategory="Expert"
				categoryNames={categories}
				onSelectCategory={onSelectCategory}
			/>
		)

		expect(screen.getByText("Expert")).toBeTruthy()
	})

	it("renders all category options after opening the menu", () => {
		renderWithProviders(
			<CategoryPicker
				currentCategory=""
				categoryNames={categories}
				onSelectCategory={onSelectCategory}
			/>
		)

		fireEvent.press(screen.getByTestId(CATEGORY_PICKER_TEST_ID))

		expect(screen.getByText("Novice")).toBeTruthy()
		expect(screen.getByText("Intermediate")).toBeTruthy()
		expect(screen.getByText("Expert")).toBeTruthy()
	})

	it("calls onSelectCategory with the chosen category name", () => {
		renderWithProviders(
			<CategoryPicker
				currentCategory=""
				categoryNames={categories}
				onSelectCategory={onSelectCategory}
			/>
		)

		fireEvent.press(screen.getByTestId(CATEGORY_PICKER_TEST_ID))
		fireEvent.press(screen.getByTestId("category-option-Expert"))

		expect(onSelectCategory).toHaveBeenCalledWith("Expert")
		expect(onSelectCategory).toHaveBeenCalledTimes(1)
	})

	it("resets the category by selecting the none option", () => {
		renderWithProviders(
			<CategoryPicker
				currentCategory="Expert"
				categoryNames={categories}
				onSelectCategory={onSelectCategory}
			/>
		)

		fireEvent.press(screen.getByTestId(CATEGORY_PICKER_TEST_ID))
		fireEvent.press(screen.getByTestId("category-option-none"))

		expect(onSelectCategory).toHaveBeenCalledWith("")
	})

	it("uses custom testID props when provided", () => {
		renderWithProviders(
			<CategoryPicker
				currentCategory=""
				categoryNames={["Cat A"]}
				onSelectCategory={onSelectCategory}
				pickerTestID="custom-picker"
				getNoneOptionTestID={() => "custom-none"}
				getOptionTestID={(name) => `custom-opt-${name}`}
			/>
		)

		expect(screen.getByTestId("custom-picker")).toBeTruthy()

		fireEvent.press(screen.getByTestId("custom-picker"))

		expect(screen.getByTestId("custom-none")).toBeTruthy()
		expect(screen.getByTestId("custom-opt-Cat A")).toBeTruthy()
	})
})
