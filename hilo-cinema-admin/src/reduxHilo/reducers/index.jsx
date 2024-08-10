import { combineReducers } from "redux";
import customerReducer from "./CustomerReducer";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import bookingReducer from "./bookingReducer";

export const allReducers = combineReducers({
    customer : customerReducer,
    auth : authReducer,
    employee : employeeReducer,
    booking: bookingReducer,
})