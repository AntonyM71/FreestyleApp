import { combineReducers, createStore } from 'redux';
import { paddlerReducer } from './reducers';

const rootReducer = combineReducers({
  paddlers: paddlerReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
