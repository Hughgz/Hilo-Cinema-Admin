import { 
    FETCH_INVOICES_REQUEST, FETCH_INVOICES_SUCCESS, 
    FETCH_INVOICES_FAILURE,
    EDIT_INVOICES_SUCCESS,EDIT_INVOICES_FAILURE,
    ADD_INVOICES_SUCCESS, ADD_INVOICES_FAILURE
  } from "../types/type";
const initialState = {
    loading: false,
    invoices: [],
    error: null
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVOICES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.payload
            };
        case FETCH_INVOICES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        // case EDIT_MOVIES_SUCCESS:
        //     return {
        //         ...state,
        //         movies: state.movies.map(mov =>
        //             mov.id === action.payload.id ? action.payload : mov
        //         ),
        //     };
        // case EDIT_MOVIES_FAILURE:
        //     return {
        //         ...state,
        //         error: action.payload,
        //     };
        // case ADD_MOVIES_SUCCESS:
        //     return {
        //         ...state,
        //         movies: [...state.movies, action.payload],
        //     };
        // case ADD_MOVIES_FAILURE:
        //     return {
        //         ...state,
        //         error: action.payload,
        //     };
        default:
            return state;
    }
};

export default invoiceReducer;
