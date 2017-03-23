import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function elementReducer(state = initialState.currentElement, action) {
  switch(action.type) {
    case types.UPDATE_SELECTED_ELEMENT:
      return action.element;
    default:
      return state;
  }
}
