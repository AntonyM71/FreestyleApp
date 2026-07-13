import moveList, { IMoves } from "../../data/moves_lists/move_list"
export const moveListArray: IMoves[] = Object.values(moveList).flat()
export const initialScoresheet = (): Record<string, moveInterface> => {
	const initialMoves = moveListArray.map(
		(item): moveInterface => ({
			id: item.Move,
			left: {
				scored: false,
				air: false,
				huge: false,
				clean: false,
				superClean: false,
				link: false,
				style: false
			},
			right: {
				scored: false,
				air: false,
				huge: false,
				clean: false,
				superClean: false,
				link: false,
				style: false
			}
		})
	)

	return initialMoves.reduce<Record<string, moveInterface>>((obj, item) => {
		obj[item.id] = item

		return obj
	}, {})
}

export interface dataSourceMoveInterface {
	Move: string
	Value: number
	Clean: number
	SuperClean: number
	Air: number
	Huge: number
	Link: number
	Style: number
	Reverse: boolean
}

export interface moveInterface {
	id: string
	left: moveSideInterface
	right: moveSideInterface
}

export interface moveSideInterface {
	scored: boolean
	air: boolean
	huge: boolean
	clean: boolean
	superClean: boolean
	link: boolean
	style: boolean
}
