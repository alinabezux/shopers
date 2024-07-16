import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, categoryReducer, productReducer, typeReducer } from "./slices";

const rootReducer = combineReducers({ productReducer, categoryReducer, typeReducer, authReducer })

const setupStore = () => configureStore({ reducer: rootReducer })

export { setupStore };