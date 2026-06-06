import {
	dataSourceMoveInterface,
	moveSideInterface
} from "../screens/mycomponents/makePaddlerScores"

export const calculateScoreAndBonuses = (
	move: dataSourceMoveInterface,
	truth: moveSideInterface
): number => {
	const hasAirBonus = truth.huge ? true : truth.air
	if (!truth.scored) {
		return 0
	}

	return [
		move.Value,
		truth.clean ? move.Clean : 0,
		truth.superClean ? move.SuperClean : 0,
		hasAirBonus ? move.Air : 0,
		truth.huge ? move.Huge : 0,
		truth.link ? move.Link : 0,
		truth.style ? move.Style : 0
	].reduce((a, b) => a + b)
}
