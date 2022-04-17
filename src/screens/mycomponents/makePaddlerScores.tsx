import moveList, { IMoves } from "../../data/moves_lists/move_list"
export const moveListArray: IMoves[] = Object.values(moveList).flat()
export const initialScoresheet = () => {
	const initialMoves = moveListArray.map(
		(item): moveInterface | moveInterface[] => {
			const scoresObject = {
				id: item.Move,
				left: {
					scored: false,
					air: false,
					huge: false,
					clean: false,
					superClean: false,
					link: false
				},
				right: {
					scored: false,
					air: false,
					huge: false,
					clean: false,
					superClean: false,
					link: false
				}
			}
			if (
				item.Move === "Trophy 1" ||
				item.Move === "Trophy 2" ||
				item.Move === "Trophy 3"
			) {
				return [scoresObject]
			} else {
				return scoresObject
			}
		}
	)

	return initialMoves.reduce((obj, item) => {
		if (Array.isArray(item)) {
			// @ts-ignore
			obj[item[0].id] = item

			return obj
		} else {
			// @ts-ignore
			obj[item.id] = item

			return obj
		}
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
}
