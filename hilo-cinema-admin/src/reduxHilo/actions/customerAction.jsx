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
