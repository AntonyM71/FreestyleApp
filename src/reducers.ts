import {
	ADD_OR_REMOVE_CATEGORY,
	ADD_OR_REMOVE_HEATS,
	ADD_OR_REMOVE_PADDLER,
	CHANGE_HEAT,
	CHANGE_PADDLER,
	UPDATE_NUMBER_OF_RUNS,
	UPDATE_PADDLER_SCORES,
	UPDATE_RUN,
	UPDATE_SHOW_RUN,
	UPDATE_SHOW_TIMER
} from "./actionTypes"
import {
	initialScoresheet,
	moveSideInterface
} from "./screens/mycomponents/makePaddlerScores"

// make our starting scoresheet from the list of paddlers
const listOfPaddlers = [
	{
		name: "paddler1",
		category: "category 1",
		heat: 1
	},
	{
		name: "paddler2",
		category: "category 1",
		heat: 1
	},
	{
		name: "paddler3",
		category: "category 1",
		heat: 1
	}
]

const startingScoresheet = {}
listOfPaddlers.flat().map((paddler) => {
	// @ts-ignore
	startingScoresheet[paddler.name] = [initialScoresheet()]
})

const initialState: IPaddlerStateType = {
	places: [],
	paddlerIndex: 0,
	paddlerList: listOfPaddlers,
	paddlerScores: startingScoresheet,
	showTimer: false,
	currentHeat: 1,
	currentRun: 0,
	numberOfRuns: 0,
	showRunHandler: true,
	categories: [
		{
			name: "category 1",
			availableMoves: { hole: true, wave: false, nfl: false }
		}
	],
	heats: Array.from(new Set(listOfPaddlers.map((p) => p.heat)))
}

// eslint-disable-next-line complexity
export const paddlerReducer = (
	state = initialState,
	action: { type: string; payload: any }
): IPaddlerStateType => {
	switch (action.type) {
		case CHANGE_PADDLER:
			return {
				...state,
				paddlerIndex: action.payload
			}
		case CHANGE_HEAT:
			return {
				...state,
				currentHeat: action.payload
			}
		case ADD_OR_REMOVE_PADDLER:
			return {
				...state,
				paddlerList: action.payload
			}
		case UPDATE_PADDLER_SCORES:
			return {
				...state,
				paddlerScores: action.payload
			}
		case UPDATE_RUN:
			return {
				...state,
				currentRun: action.payload
			}
		case UPDATE_NUMBER_OF_RUNS:
			return {
				...state,
				numberOfRuns: action.payload
			}
		case UPDATE_SHOW_TIMER:
			return {
				...state,
				showTimer: action.payload
			}
		case UPDATE_SHOW_RUN:
			return {
				...state,
				showRunHandler: action.payload
			}
		case ADD_OR_REMOVE_CATEGORY:
			return {
				...state,
				categories: action.payload
			}
		case ADD_OR_REMOVE_HEATS:
			return {
				...state,
				heats: action.payload
			}
		default:
			return state
	}
}

export interface IPaddlerStateType {
	places: string[]
	paddlerIndex: number
	paddlerList: IPaddlerList
	paddlerScores: IPaddlerScores
	showTimer: boolean
	currentHeat: number
	currentRun: number
	numberOfRuns: number
	showRunHandler: boolean
	categories: ICategory[]
	heats: number[]
}

export interface ICategory {
	name: string
	availableMoves: IEnabledMoves
}
export type IPaddlerScores = Record<
	IPaddler["name"],
	Record<IMoveName, MoveType>[]
>
export interface MoveType {
	id: string
	left: moveSideInterface
	right: moveSideInterface
}

export interface IEnabledMoves {
	hole: boolean
	wave: boolean
	nfl: boolean
}
type IMoveName = string
export type IPaddlerList = IPaddler[]

export interface IPaddler {
	name: string
	category: string
	heat: number
}

export type IDirection = "left" | "right"
