import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function controlReducer(state = initialState.elements, action) {
  switch(action.type) {
    case types.CREATE_NEW_ELEMENT:
      return [
        ...state,
        action.element
      ];
    default:
      return state;
  }
}