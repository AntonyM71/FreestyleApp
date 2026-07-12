import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Dialog, Portal, Text } from "react-native-paper"

export interface ExportOption {
	key: string
	label: string
	onPress: () => void
}

interface ExportModalProps {
	visible: boolean
	options: ExportOption[]
	onCancel: () => void
}

export const ExportModal = ({
	visible,
	options,
	onCancel
}: ExportModalProps) => (
	<Portal>
		<Dialog visible={visible} onDismiss={onCancel}>
			<Dialog.Title>{"Export Scores"}</Dialog.Title>
			<Dialog.Content>
				<Text style={layoutStyles.message}>
					{"Choose an export format:"}
				</Text>
				<View style={layoutStyles.optionList}>
					{options.map((option) => (
						<Button
							key={option.key}
							mode="outlined"
							onPress={option.onPress}
							style={layoutStyles.optionButton}
						>
							{option.label}
						</Button>
					))}
				</View>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>{"Cancel"}</Button>
			</Dialog.Actions>
		</Dialog>
	</Portal>
)

const layoutStyles = StyleSheet.create({
	message: {
		marginBottom: 12
	},
	optionList: {
		gap: 8
	},
	optionButton: {
		width: "100%"
	}
})

export default ExportModal
