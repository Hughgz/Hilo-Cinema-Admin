import {
    FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE, EDIT_MOVIES_SUCCESS, EDIT_MOVIES_FAILURE,
    ADD_MOVIES_SUCCESS, ADD_MOVIES_FAILURE
} from "../types/type";

const initialState = {
    loading: false,
    movies: [],
    error: null
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case EDIT_MOVIES_SUCCESS:
            return {
                ...state,
                movies: state.movies.map(mov =>
                    mov.id === action.payload.id ? action.payload : mov
                ),
            };
        case EDIT_MOVIES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_MOVIES_SUCCESS:
            return {
                ...state,
                movies: [...state.movies, action.payload],
            };
        case ADD_MOVIES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default movieReducer;
