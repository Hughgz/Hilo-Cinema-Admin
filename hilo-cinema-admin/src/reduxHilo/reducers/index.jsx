import { combineReducers } from "redux";
import customerReducer from "./CustomerReducer";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";

export const allReducers = combineReducers({
    customer : customerReducer,
    auth : authReducer,
    employee : employeeReducer,
})