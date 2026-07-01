import { fireEvent, render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ConfirmationModal } from "../ConfirmationModal"

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

describe("ConfirmationModal", () => {
  it("renders the message when visible", () => {
    renderWithProviders(
      <ConfirmationModal
        visible={true}
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )

    expect(screen.getByText("Are you sure?")).toBeTruthy()
    expect(screen.getByText("Confirm")).toBeTruthy()
    expect(screen.getByText("Cancel")).toBeTruthy()
  })

  it("does not render dialog content when not visible", () => {
    renderWithProviders(
      <ConfirmationModal
        visible={false}
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )

    expect(screen.queryByText("Are you sure?")).toBeNull()
  })

  it("calls onConfirm when Confirm is pressed", () => {
    const onConfirm = jest.fn()
    const onCancel = jest.fn()

    renderWithProviders(
      <ConfirmationModal
        visible={true}
        message="Are you sure?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    fireEvent.press(screen.getByText("Confirm"))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onCancel).not.toHaveBeenCalled()
  })

  it("calls onCancel when Cancel is pressed", () => {
    const onConfirm = jest.fn()
    const onCancel = jest.fn()

    renderWithProviders(
      <ConfirmationModal
        visible={true}
        message="Are you sure?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )

    fireEvent.press(screen.getByText("Cancel"))

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it("renders the correct message passed via props", () => {
    renderWithProviders(
      <ConfirmationModal
        visible={true}
        message="This will delete all data permanently."
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )

    expect(screen.getByText("This will delete all data permanently.")).toBeTruthy()
  })
})
