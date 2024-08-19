import axios from "axios";

export const fetchCustomersRequest = () => ({
  type: "FETCH_CUSTOMERS_REQUEST"
});

export const fetchCustomersSuccess = (customers) => ({
  type: "FETCH_CUSTOMERS_SUCCESS",
  payload: customers
});

export const fetchCustomersFailure = (error) => ({
  type: "FETCH_CUSTOMERS_FAILURE",
  payload: error.message || error.toString()
});

export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch(fetchCustomersRequest());
    return axios.get("https://localhost:5005/api/Customer")
      .then(response => {
        dispatch(fetchCustomersSuccess(response.data));
      })
      .catch(error => {
        console.error("There was an error!", error);
        dispatch(fetchCustomersFailure(error));
      });
  };
};
//Total Customer
export const fetchCustomersCountSuccess = (count) => ({
  type: "FETCH_CUSTOMERS_COUNT_SUCCESS",
  payload: count,
});

export const fetchCustomersCountFailure = (error) => ({
  type: "FETCH_CUSTOMERS_COUNT_FAILURE",
  payload: error.message || error.toString(),
});

export const fetchCustomerCount = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get('https://localhost:5005/api/Customer/Count', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Thêm token vào header của yêu cầu
        },
      });
      dispatch(fetchCustomersCountSuccess(response.data));
    } catch (error) {
      dispatch(fetchCustomersCountFailure(error));
    }
  };
};

//Search
export const searchCustomersRequest = () => ({
  type: "SEARCH_CUSTOMERS_REQUEST"
});

export const searchCustomersSuccess = (customers) => ({
  type: "SEARCH_CUSTOMERS_SUCCESS",
  payload: customers
});

export const searchCustomersFailure = (error) => ({
  type: "SEARCH_CUSTOMERS_FAILURE",
  payload: error.message || error.toString()
});

export const searchCustomers = (searchValue, searchField) => {
  return async (dispatch) => {
    dispatch(searchCustomersRequest());
    try {
      const response = await axios.get(`https://localhost:5005/api/Customer/Search`, {
        params: {
          searchValue: searchValue,
          searchField: searchField,
        },
      });
      dispatch(searchCustomersSuccess(response.data));
    } catch (error) {
      // Kiểm tra mã lỗi và thay thế thông báo lỗi nếu là 404
      if (error.response && error.response.status === 404) {
        dispatch(searchCustomersFailure(new Error("No customer found")));
      } else {
        dispatch(searchCustomersFailure(error));
      }
    }
  };
};
export const clearSearchResults = () => ({
  type: "CLEAR_SEARCH_RESULTS",
});

