import { combineReducers, createStore } from "redux"
import { IPaddlerStateType, paddlerReducer } from "./reducers"

const rootReducer = combineReducers({
	paddlers: paddlerReducer
})

const configureStore = () => createStore(rootReducer)

export default configureStore

export interface IStoreType {
	paddlers: IPaddlerStateType
}
