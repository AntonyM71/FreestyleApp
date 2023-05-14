import _ from "lodash"
import moveList, { IMoves } from "../../data/moves_lists/move_list"
import {
	IMoveName,
	IPaddler,
	IPaddlerList,
	IPaddlerScoreCard,
	MoveType
} from "../../reducers"
export const moveListArray: IMoves[] = Object.values(moveList).flat()
export const initialScoresheet = (): Record<
	IMoveName,
	MoveType | MoveType[]
> => {
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
				return [_.cloneDeep(scoresObject)]
			} else {
				return _.cloneDeep(scoresObject)
			}
		}
	)

	return initialMoves.reduce((obj, item) => {
		if (Array.isArray(item)) {
			// @ts-ignore
			obj[item[0].id] = _.cloneDeep(item)

			return obj
		} else {
			// @ts-ignore
			obj[item.id] = _.cloneDeep(item)

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
export const blankScoreCard: IPaddlerScoreCard = {
	scoredMoves: JSON.parse(JSON.stringify(initialScoresheet())),
	multiplier: 1
}
export const makeScoresForHeat = (paddlerList: IPaddlerList) => {
	const startingScoresheet = {}
	if (paddlerList.length === 0) {
		throw new Error("Cant make a heat with no paddlers")
	}
	paddlerList.flat().map((paddler: IPaddler) => {
		// @ts-ignore
		startingScoresheet[paddler.name] = [
			JSON.parse(JSON.stringify(blankScoreCard))
		]
	})

	return JSON.parse(JSON.stringify(startingScoresheet))
}
