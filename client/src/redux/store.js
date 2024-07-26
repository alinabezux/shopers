import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, basketReducer, categoryReducer, favoriteReducer, orderReducer, productReducer, typeReducer, userReducer } from "./slices";

const rootReducer = combineReducers({
    productReducer, categoryReducer, typeReducer, authReducer, basketReducer, userReducer, favoriteReducer, orderReducer
})

const setupStore = () => configureStore({ reducer: rootReducer })

export { setupStore };