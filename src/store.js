import {  applyMiddleware, combineReducers, compose, legacy_createStore } from "redux"; // Import createStore instead of legacy_createStore
import {thunk} from "redux-thunk"; // Import thunk without braces
import { Transationreducer } from "./Redux/Reducer";





const root = combineReducers({

  transactionList:Transationreducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(root, composeEnhancer(applyMiddleware(thunk))); // Use createStore instead of legacy_createStore

