import * as types from './actionTypes';

export function createElement(element) {
  return {
    type: types.CREATE_NEW_ELEMENT,
    element
  };
}

export function updateElementContent(element) {
  return {
    type: types.UPDATE_ELEMENT_CONTENT,
    element
  };
}

export function updateSelectedElement(element) {
  return {
    type: types.UPDATE_SELECTED_ELEMENT,
    element
  }
}
