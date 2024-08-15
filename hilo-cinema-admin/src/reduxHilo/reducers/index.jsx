import { combineReducers } from "redux";
import customerReducer from "./CustomerReducer";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import bookingReducer from "./bookingReducer";
import movieReducer from "./movieReducer";
import roomReducer from "./roomReducer";
import seatReducer from "./seatReducer";

export const allReducers = combineReducers({
    customer : customerReducer,
    auth : authReducer,
    employee : employeeReducer,
    booking: bookingReducer,
    movie : movieReducer,
    room : roomReducer,
    seat : seatReducer
})