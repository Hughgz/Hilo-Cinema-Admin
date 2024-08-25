import axios from "axios";

// Fetch Customers Actions
export const fetchCustomersRequest = () => ({
  type: "FETCH_CUSTOMERS_REQUEST",
});

export const fetchCustomersSuccess = (customers) => ({
  type: "FETCH_CUSTOMERS_SUCCESS",
  payload: customers,
});

export const fetchCustomersFailure = (error) => ({
  type: "FETCH_CUSTOMERS_FAILURE",
  payload: error.message || error.toString(),
});

export const fetchCustomers = () => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const sysRole = state.auth.user ? state.auth.user.sysRole : null;

    dispatch(fetchCustomersRequest());

    return axios.get("http://localhost:8000/CustomerService", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Site-Type': sysRole || 'default',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        dispatch(fetchCustomersSuccess(response.data));
      })
      .catch(error => {
        console.error("There was an error!", error.message);
        if (error.response && error.response.status === 401) {
          dispatch(fetchCustomersFailure("Unauthorized access"));
        } else if (error.response && error.response.status === 403) {
          dispatch(fetchCustomersFailure("Forbidden access"));
        } else {
          dispatch(fetchCustomersFailure(error));
        }
      });
  };
};

// Fetch Customer Count Actions
export const fetchCustomersCountSuccess = (count) => ({
  type: "FETCH_CUSTOMERS_COUNT_SUCCESS",
  payload: count,
});

export const fetchCustomersCountFailure = (error) => ({
  type: "FETCH_CUSTOMERS_COUNT_FAILURE",
  payload: error.message || error.toString(),
});

export const fetchCustomerCount = () => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const sysRole = state.auth.user ? state.auth.user.sysRole : null;

    return axios.get("http://localhost:8000/CustomerService/Count", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Site-Type': sysRole || 'default',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        dispatch(fetchCustomersCountSuccess(response.data));
      })
      .catch(error => {
        console.error("There was an error!", error.message);
        if (error.response && error.response.status === 401) {
          dispatch(fetchCustomersCountFailure("Unauthorized access"));
        } else if (error.response && error.response.status === 403) {
          dispatch(fetchCustomersCountFailure("Forbidden access"));
        } else {
          dispatch(fetchCustomersCountFailure(error));
        }
      });
  };
};

// Search Customers Actions
export const searchCustomersRequest = () => ({
  type: "SEARCH_CUSTOMERS_REQUEST",
});

export const searchCustomersSuccess = (customers) => ({
  type: "SEARCH_CUSTOMERS_SUCCESS",
  payload: customers,
});

export const searchCustomersFailure = (error) => ({
  type: "SEARCH_CUSTOMERS_FAILURE",
  payload: error.message || error.toString(),
});

export const searchCustomers = (searchValue, searchField) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const sysRole = state.auth.user ? state.auth.user.sysRole : null;

    dispatch(searchCustomersRequest());

    return axios.get("http://localhost:8000/CustomerService/Search", {
      params: {
        searchValue: searchValue,
        searchField: searchField,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Site-Type': sysRole || 'default',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        dispatch(searchCustomersSuccess(response.data));
      })
      .catch(error => {
        console.error("There was an error!", error.message);
        if (error.response && error.response.status === 404) {
          dispatch(searchCustomersFailure(new Error("No customer found")));
        } else if (error.response && error.response.status === 401) {
          dispatch(searchCustomersFailure("Unauthorized access"));
        } else if (error.response && error.response.status === 403) {
          dispatch(searchCustomersFailure("Forbidden access"));
        } else {
          dispatch(searchCustomersFailure(error));
        }
      });
  };
};

// Hide Customer Actions
export const hideCustomerRequest = () => ({
  type: "HIDE_CUSTOMER_REQUEST",
});

export const hideCustomerSuccess = (customerId) => ({
  type: "HIDE_CUSTOMER_SUCCESS",
  payload: customerId,
});

export const hideCustomerFailure = (error) => ({
  type: "HIDE_CUSTOMER_FAILURE",
  payload: error.message || error.toString(),
});

export const hideCustomer = (customerId) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const sysRole = state.auth.user ? state.auth.user.sysRole : null;

    dispatch(hideCustomerRequest());

    return axios.put(`http://localhost:8000/CustomerService/${customerId}/disable`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Site-Type': sysRole || 'default',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(hideCustomerSuccess(customerId));
      })
      .catch(error => {
        console.error("There was an error!", error.message);
        if (error.response && error.response.status === 401) {
          dispatch(hideCustomerFailure("Unauthorized access"));
        } else if (error.response && error.response.status === 403) {
          dispatch(hideCustomerFailure("Forbidden access"));
        } else {
          dispatch(hideCustomerFailure(error));
        }
      });
  };
};

export const clearSearchResults = () => ({
  type: "CLEAR_SEARCH_RESULTS",
});
