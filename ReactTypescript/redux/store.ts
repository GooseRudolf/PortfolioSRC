import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/usersReducer";
import { authReducer } from "./reducers/authReducer";
import { uiReducer } from './reducers/uiReducer'

const rootReducer = combineReducers({
    users: userReducer,
    auth: authReducer,
    ui: uiReducer
})
export const store = configureStore({ reducer:rootReducer })