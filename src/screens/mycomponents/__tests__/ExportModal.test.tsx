import React from "react"
import { fireEvent, render, screen } from "@testing-library/react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as PaperProvider } from "react-native-paper"
import ExportModal from "../ExportModal"

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

describe("ExportModal", () => {
	const mockOptions = [
		{ key: "csv", label: "Save as CSV", onPress: jest.fn() },
		{ key: "pdf", label: "Export as PDF", onPress: jest.fn() }
	]

	it("renders the title and options when visible", () => {
		renderWithProviders(
			<ExportModal
				visible={true}
				options={mockOptions}
				onCancel={jest.fn()}
			/>
		)

		expect(screen.getByText("Export Scores")).toBeTruthy()
		expect(screen.getByText("Choose an export format:")).toBeTruthy()
		expect(screen.getByText("Save as CSV")).toBeTruthy()
		expect(screen.getByText("Export as PDF")).toBeTruthy()
		expect(screen.getByText("Cancel")).toBeTruthy()
	})

	it("does not render content when not visible", () => {
		renderWithProviders(
			<ExportModal
				visible={false}
				options={mockOptions}
				onCancel={jest.fn()}
			/>
		)

		expect(screen.queryByText("Export Scores")).toBeNull()
	})

	it("calls the option onPress handler when an option is pressed", () => {
		const csvHandler = jest.fn()
		const options = [{ key: "csv", label: "Save as CSV", onPress: csvHandler }]

		renderWithProviders(
			<ExportModal
				visible={true}
				options={options}
				onCancel={jest.fn()}
			/>
		)

		fireEvent.press(screen.getByText("Save as CSV"))

		expect(csvHandler).toHaveBeenCalledTimes(1)
	})

	it("calls onCancel when Cancel is pressed", () => {
		const onCancel = jest.fn()

		renderWithProviders(
			<ExportModal
				visible={true}
				options={mockOptions}
				onCancel={onCancel}
			/>
		)

		fireEvent.press(screen.getByText("Cancel"))

		expect(onCancel).toHaveBeenCalledTimes(1)
	})

	it("renders with a single option", () => {
		const singleOption = [{ key: "csv", label: "Save as CSV", onPress: jest.fn() }]

		renderWithProviders(
			<ExportModal
				visible={true}
				options={singleOption}
				onCancel={jest.fn()}
			/>
		)

		expect(screen.getByText("Save as CSV")).toBeTruthy()
	})

	it("renders with no options", () => {
		renderWithProviders(
			<ExportModal
				visible={true}
				options={[]}
				onCancel={jest.fn()}
			/>
		)

		expect(screen.getByText("Export Scores")).toBeTruthy()
		expect(screen.getByText("Cancel")).toBeTruthy()
	})
})
