import {combineReducers} from 'redux';
import controls from './controlReducer';

const rootReducer = combineReducers({
  elements: controls
});

export default rootReducer;