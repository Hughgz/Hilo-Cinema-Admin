import {
    FETCH_SCHEDULES_REQUEST, FETCH_SCHEDULES_SUCCESS,
    FETCH_SCHEDULES_FAILURE,
    FETCH_SCHEDULES_BY_MOVIEID_REQUEST,
    FETCH_SCHEDULES_BY_MOVIEID_SUCCESS,
    FETCH_SCHEDULES_BY_MOVIEID_FAILURE,
    CLEAR_SCHEDULES
} from "../types/type";

const initialState = {
    loading: false,
    schedules: [],
    error: null
};

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SCHEDULES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_SCHEDULES_SUCCESS:
            return {
                ...state,
                loading: false,
                schedules: action.payload,
            };
        case FETCH_SCHEDULES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_SCHEDULES_BY_MOVIEID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SCHEDULES_BY_MOVIEID_SUCCESS:
            return {
                ...state,
                loading: false,
                schedules: action.payload,
            };
        case FETCH_SCHEDULES_BY_MOVIEID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_SCHEDULES:
            return {
                ...state,
                schedules: []  // Reset lại danh sách schedules
            };
        default:
            return state;
    }
};

export default scheduleReducer;
