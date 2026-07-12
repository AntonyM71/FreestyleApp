import React from "react"
import { fireEvent, render, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as PaperProvider } from "react-native-paper"
import ResultsScreen from "../ResultsScreen"

// Mock ResultsView component
jest.mock("../mycomponents/resultsView", () =>
	() => null
)

// Mock ExportModal to avoid animation timing issues; the modal is tested separately
jest.mock("../mycomponents/ExportModal", () => {
	/* eslint-disable @typescript-eslint/no-require-imports */
	const RN = require("react-native") as typeof import("react-native")
	const ReactLib = require("react") as typeof import("react")
	/* eslint-enable @typescript-eslint/no-require-imports */

	return {
		__esModule: true,
		default: ({ visible, options, onCancel }: {
			visible: boolean
			options: { key: string; label: string; onPress: () => void }[]
			onCancel: () => void
		}) => {
			if (!visible) {
				return null
			}

			return ReactLib.createElement(
				RN.View,
				{ testID: "export-modal" },
				ReactLib.createElement(RN.Text, null, "Export Scores"),
				...options.map((opt) =>
					ReactLib.createElement(
						RN.TouchableOpacity,
						{ key: opt.key, onPress: opt.onPress, testID: `export-option-${opt.key}` },
						ReactLib.createElement(RN.Text, null, opt.label)
					)
				),
				ReactLib.createElement(
					RN.TouchableOpacity,
					{ onPress: onCancel, testID: "export-cancel" },
					ReactLib.createElement(RN.Text, null, "Cancel")
				)
			)
		}
	}
})

jest.mock("../../utils/exportScores", () => ({
	exportScoresToCsv: jest.fn().mockResolvedValue(undefined)
}))

const safeAreaMetrics = {
	frame: { x: 0, y: 0, width: 320, height: 640 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 }
}

describe("ResultsScreen", () => {
	const createTestStore = () => {
		const initialState = {
			paddlers: {
				places: [],
				paddlerIndex: 0,
				paddlerList: [],
				paddlerScores: {},
				showTimer: false,
				currentHeat: 1,
				currentRun: 0,
				numberOfRuns: 0,
				showRunHandler: true,
				categories: [],
				heats: []
			}
		}

		return createStore((state = initialState) => state)
	}

	const renderWithProviders = (ui: React.ReactElement) => {
		const store = createTestStore()

		return render(ui, {
			wrapper: ({ children }) => (
				<SafeAreaProvider initialMetrics={safeAreaMetrics}>
					<PaperProvider>
						<Provider store={store}>{children}</Provider>
					</PaperProvider>
				</SafeAreaProvider>
			)
		})
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("renders without crashing", () => {
		renderWithProviders(<ResultsScreen />)
	})

	it("has correct navigation options", () => {
		expect(ResultsScreen.navigationOptions).toEqual({
			title: "Results"
		})
	})

	it("renders a share button", () => {
		renderWithProviders(<ResultsScreen />)

		expect(screen.getByTestId("share-button")).toBeTruthy()
		expect(screen.getByText("Share")).toBeTruthy()
	})

	it("opens the export modal when share button is pressed", () => {
		renderWithProviders(<ResultsScreen />)

		expect(screen.queryByTestId("export-modal")).toBeNull()

		fireEvent.press(screen.getByTestId("share-button"))

		expect(screen.getByTestId("export-modal")).toBeTruthy()
		expect(screen.getByText("Export Scores")).toBeTruthy()
		expect(screen.getByText("Save as CSV")).toBeTruthy()
	})

	it("closes the export modal when Cancel is pressed", () => {
		renderWithProviders(<ResultsScreen />)

		fireEvent.press(screen.getByTestId("share-button"))
		expect(screen.getByTestId("export-modal")).toBeTruthy()

		fireEvent.press(screen.getByTestId("export-cancel"))
		expect(screen.queryByTestId("export-modal")).toBeNull()
	})

	it("applies correct styles to the safe area", () => {
		renderWithProviders(<ResultsScreen />)

		const safeArea = screen.getByTestId("results-safe-area")
		expect(safeArea).toHaveStyle({ flex: 1 })
	})
})
