const initialState = {
  loading: false,
  customers: [],
  count: 0,
  error: null,
  searchResults: [], // Thêm state để lưu kết quả tìm kiếm
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CUSTOMERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };
    case "SEARCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };
    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [], // Clear searchResults
      };
    case "FETCH_CUSTOMERS_FAILURE":
    case "SEARCH_CUSTOMERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_CUSTOMERS_COUNT_SUCCESS":
      return {
        ...state,
        count: action.payload,
      };
    case "FETCH_CUSTOMERS_COUNT_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "HIDE_CUSTOMER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "HIDE_CUSTOMER_SUCCESS":
      return {
        ...state,
        loading: false,
        customers: state.customers.map((customer) =>
          customer.id === action.payload ? { ...customer, status: "Inactive" } : customer
        ),
      };
    case "HIDE_CUSTOMER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
