import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categoryReducer, productReducer, typeReducer} from "./slices";

const rootReducer = combineReducers({productReducer, categoryReducer, typeReducer})

const setupStore = () => configureStore({reducer: rootReducer})

export {setupStore};