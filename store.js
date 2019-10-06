import { combineReducers, createStore } from 'redux';
import { paddlerReducer, scoreReducer } from './reducers';

const rootReducer = combineReducers({
    scores: scoreReducer,
    paddlers: paddlerReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;