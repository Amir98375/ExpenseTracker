
import { Add_Transation, Delete_Transation, Modify_Transaction, clearAllTransation } from "./ActionsType";

const initialState = {
  transationList: [],
};

export const Transationreducer = (state = initialState, { type, payload }) => {
    debugger
  switch (type) {
    case Add_Transation:
      if (payload) {
        return {
          ...state,
          transationList: [
            ...state.transationList,
          
               payload,
        
          ],
        };
      }
      return state; // Return current state if payload is not provided

    case Delete_Transation:
      if (payload||payload===0) {
        debugger
        return {
          ...state,
          transationList: state.transationList.filter(
            (el, index) => index !== payload
          ),
        };
      }
      return state; // Return current state if payload is not provided

    case Modify_Transaction:
      if ( (payload.id === 0 || payload.id)) {
        return {
          ...state,
          transationList: state.transationList.map((el, i) =>
            i === payload.id ? payload.item : el
          ),
        };
      }
      return state; // Return current state if payload is not provided or index is invalid



    default:
      return state; // Return current state for unknown action types
  }
};
