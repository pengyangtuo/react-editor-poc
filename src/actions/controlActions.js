import * as types from './actionTypes';

export function createElement(element) {
  return {
    type: types.CREATE_NEW_ELEMENT,
    element
  };
}