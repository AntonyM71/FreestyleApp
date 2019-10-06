import { combineReducers, createStore } from 'redux';
import scoreReducer from './reducers';

const rootReducer = combineReducers({
  scores: scoreReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;