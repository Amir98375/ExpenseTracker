// import { Add_Transation, Delete_Transation, Modify_Transaction, clearAllTransation } from "./ActionsType";


// const initialState = {
//   transationList: [],
// };

// export const transationreducer = (state = initialState, { type, payload }) => {
//   debugger;
//   switch (type) {
//     case Add_Transation: {
//       if (payload) {
//         return {
//           ...state,
//           transationList: [
//             ...state.transationList,
//             {
//               check: false,
//               item: payload,
//             },
//           ],
//         };
//       }
//     }
//     case Delete_Transation: {
//       if (payload) {
//         return {
//           ...state,
//           transationList: state.transationList.filter(
//             (el, index) => index !== payload.index
//           ),
//         };
//       }
//     }
//     case Modify_Transaction: {
//       // console.log(payload,'inside reducer')
//       if (payload.index == 0 || payload.index) {
//         return {
//           ...state,
        
//           transationList: state.transationList.map((el, i) =>
//             i === payload.index ? { ...el, check: !el.check } : el
//           ),
//         };
//       }
//     }
//     case clearAllTransation: {
//       return {
//         ...state,
//         transationList: state.transationList.filter((el, i) => el.check == false),
//       };
//     }
//     default:
//       return state;
//   }
// };
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
      if (payload) {
        return {
          ...state,
          transationList: state.transationList.filter(
            (el, index) => index !== payload.index
          ),
        };
      }
      return state; // Return current state if payload is not provided

    case Modify_Transaction:
      if (payload && (payload.index === 0 || payload.index)) {
        return {
          ...state,
          transationList: state.transationList.map((el, i) =>
            i === payload.index ? { ...el, check: !el.check } : el
          ),
        };
      }
      return state; // Return current state if payload is not provided or index is invalid

    case clearAllTransation:
      return {
        ...state,
        transationList: state.transationList.filter((el) => !el.check),
      };

    default:
      return state; // Return current state for unknown action types
  }
};
