import {
	ADD_OR_REMOVE_PADDLER,
	CHANGE_HEAT,
	CHANGE_PADDLER,
	ENABLED_MOVES,
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
	[{ name: "paddler1" }, { name: "paddler2" }, { name: "paddler3" }]
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
	currentHeat: 0,
	currentRun: 0,
	numberOfRuns: 0,
	showRunHandler: true,
	enabledMoves: { wave: true, hole: true }
}

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
		case ENABLED_MOVES:
			return {
				...state,
				enabledMoves: action.payload
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
	enabledMoves: IEnabledMoves
}

export type IPaddlerScores = Record<
	IPaddler["name"],
	Record<IMoveName, MoveType | MoveType[]>[]
>
export interface MoveType {
	id: string
	left: moveSideInterface
	right: moveSideInterface
}

export interface IEnabledMoves {
	hole: boolean
	wave: boolean
}
type IMoveName = string
export type IPaddlerList = IPaddler[][]

export interface IPaddler {
	name: string
}

export type IDirection = "left" | "right"
