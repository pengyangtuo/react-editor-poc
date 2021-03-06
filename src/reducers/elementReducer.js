import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function elementReducer(state = initialState.elements, action) {
  switch(action.type) {
    case types.CREATE_NEW_ELEMENT:
      return [
        ...state,
        action.element
      ];
    case types.UPDATE_ELEMENT_CONTENT:
      return state.map(element => {
        if(element.id == action.element.id){
          return action.element;
        }else{
          return element;
        }
      });
    default:
      return state;
  }
}
