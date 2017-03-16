import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function controlReducer(state = initialState.elements, action) {
  switch(action.type) {
    case types.CREATE_NEW_ELEMENT:
      return [
        ...state,
        action.element
      ];
    case types.UPDATE_ELEMENT_CONTENT:
      console.log('reducer', action.element);
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