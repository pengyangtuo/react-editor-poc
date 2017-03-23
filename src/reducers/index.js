import {combineReducers} from 'redux';
import controls from './controlReducer';
import elements from './elementReducer';

const rootReducer = combineReducers({
  elements: elements,
  currentElement: controls
});

export default rootReducer;
