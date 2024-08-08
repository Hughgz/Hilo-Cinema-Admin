const initialState = {
    loading: false,
    customers: [],
    error: null
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "":
        return {
          ...state,
          loading: true
        };
      case "FETCH_CUSTOMERS_SUCCESS":
        return {
          ...state,
          loading: false,
          customers: action.payload
        };
      case "FETCH_CUSTOMERS_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default customerReducer;
  