import React from "react"
import { Button, Dialog, Portal, Text } from "react-native-paper"

interface ConfirmationModalProps {
	visible: boolean
	message: string
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmationModal = ({
	visible,
	message,
	onConfirm,
	onCancel
}: ConfirmationModalProps) => (
	<Portal>
		<Dialog visible={visible} onDismiss={onCancel}>
			<Dialog.Content>
				<Text>{message}</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={onCancel}>{"Cancel"}</Button>
				<Button onPress={onConfirm}>{"Confirm"}</Button>
			</Dialog.Actions>
		</Dialog>
	</Portal>
)

export default ConfirmationModal
