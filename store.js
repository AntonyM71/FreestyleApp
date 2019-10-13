import { combineReducers, createStore } from 'redux';
import { paddlerReducer, scoreReducer } from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';
const rootReducer = combineReducers({
  paddlers:  paddlerReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;