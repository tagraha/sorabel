// counter.js
import { productsMock } from './../initialStates';

// Actions
const SET_PRODUCTS_STORE = 'SET_PRODUCTS_STORE';

// Reducer
export default function reducer(state = productsMock, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case SET_PRODUCTS_STORE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export function setProductsStore(products) {
  return { type: SET_PRODUCTS_STORE, payload: products };
}
