import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, basketReducer, categoryReducer, productReducer, typeReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
    productReducer, categoryReducer, typeReducer, authReducer, basketReducer, userReducer
})

const setupStore = () => configureStore({ reducer: rootReducer })

export { setupStore };