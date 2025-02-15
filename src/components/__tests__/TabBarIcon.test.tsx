import React from "react"
import { render } from "@testing-library/react-native"
import TabBarIcon from "../TabBarIcon"

interface IoniconsProps {
  name: string
  size: number
  style: { marginBottom: number }
  color: string
}

const mockIonicons = jest.fn<null, [IoniconsProps]>(() => null)

// Mock Ionicons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: (props: IoniconsProps) => {
    mockIonicons(props)

    return null
  }
}))

// Mock Colors
jest.mock("../../constants/Colors", () => ({
  tabIconSelected: "#2f95dc",
  tabIconDefault: "#ccc"
}))

describe("TabBarIcon", () => {
  beforeEach(() => {
    mockIonicons.mockClear()
  })

  it("renders without crashing", () => {
    render(<TabBarIcon name="test-icon" focused={false} />)
    expect(mockIonicons).toHaveBeenCalled()
  })

  it("passes correct props when focused", () => {
    render(<TabBarIcon name="test-icon" focused={true} />)

    expect(mockIonicons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "test-icon",
        size: 26,
        style: { marginBottom: -3 },
        color: "#2f95dc" // tabIconSelected color
      })
    )
  })

  it("passes correct props when not focused", () => {
    render(<TabBarIcon name="test-icon" focused={false} />)

    expect(mockIonicons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "test-icon",
        size: 26,
        style: { marginBottom: -3 },
        color: "#ccc" // tabIconDefault color
      })
    )
  })

  it("updates color when focus changes", () => {
    render(<TabBarIcon name="test-icon" focused={false} />)
    expect(mockIonicons).toHaveBeenLastCalledWith(
      expect.objectContaining({
        color: "#ccc"
      })
    )

    render(<TabBarIcon name="test-icon" focused={true} />)
    expect(mockIonicons).toHaveBeenLastCalledWith(
      expect.objectContaining({
        color: "#2f95dc"
      })
    )
  })
})
