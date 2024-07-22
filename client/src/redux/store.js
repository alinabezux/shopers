import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, basketReducer, categoryReducer, favoriteReducer, productReducer, typeReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
    productReducer, categoryReducer, typeReducer, authReducer, basketReducer, userReducer, favoriteReducer
})

const setupStore = () => configureStore({ reducer: rootReducer })

export { setupStore };