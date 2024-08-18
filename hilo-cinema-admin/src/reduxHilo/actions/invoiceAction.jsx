import axios from "axios";
import { 
    FETCH_INVOICES_REQUEST, FETCH_INVOICES_SUCCESS, 
    FETCH_INVOICES_FAILURE,
    EDIT_INVOICES_SUCCESS,EDIT_INVOICES_FAILURE,
    ADD_INVOICES_SUCCESS, ADD_INVOICES_FAILURE,
    FETCH_INVOICES_COUNT_SUCCESS,
    FETCH_INVOICES_COUNT_FAILURE
  } from "../types/type";
export const fetchInvoicesRequest = () => ({
  type: FETCH_INVOICES_REQUEST
});

export const fetchInvoicesSuccess = (customers) => ({
  type: FETCH_INVOICES_SUCCESS,
  payload: customers
});

export const fetchInvoicesFailure = (error) => ({
  type: FETCH_INVOICES_FAILURE,
  payload: error.message || error.toString()
});

export const fetchInvoices = () => {
  return (dispatch) => {
    dispatch(fetchInvoicesRequest());
    return axios.get("https://localhost:5004/api/Invoice")
      .then(response => {
        dispatch(fetchInvoicesSuccess(response.data));
      })
      .catch(error => {
        console.error("There was an error!", error);
        dispatch(fetchInvoicesFailure(error));
      });
  };
};
export const fetchGetInvoicesByCustomerId = (customerId) => {
    return (dispatch) => {
        return axios.get(`https://localhost:5004/api/Schedule/GetInvoicesByCustomerId/${customerId}`)
          .then(response => {
            dispatch(fetchInvoicesSuccess([response.data])); // You can adjust this based on your needs
          })
          .catch(error => {
            console.error("There was an error fetching movie details!", error);
            dispatch(fetchInvoicesFailure(error));
          });
      };
}
export const fetchTotalInvoiceByCustomerId = (customerId) => {
    return (dispatch) => {
      return axios.get(`https://localhost:5004/api/Schedule/GetTotalInvoiceByCustomerId/${customerId}`)
        .then(response => {
          return response.data; // Trả về tổng số tiền của khách hàng
        })
        .catch(error => {
          console.error("There was an error fetching total invoice by customer ID!", error);
          return 0; // Nếu lỗi, trả về 0
        });
    };
  };
//Edit Invoice
export const editInvoiceSuccess = (invoice) => ({
  type: EDIT_INVOICES_SUCCESS,
  payload: invoice,
});

export const editInvoiceFailure = (error) => ({
  type: EDIT_INVOICES_FAILURE,
  payload: error.message || error.toString(),
});

export const editInvoice = (id, invoiceData) => {
  return (dispatch) => {
    return axios.put(`https://localhost:5004/api/Invoice/${id}`, invoiceData)
      .then(response => {
        dispatch(editInvoiceSuccess(response.data));
      })
      .catch(error => {
        dispatch(editInvoiceFailure(error));
      });
  };
};
export const fetchInvoiceDetails = (id) => {
  return (dispatch) => {
    return axios.get(`https://localhost:5004/api/Invoice/${id}`)
      .then(response => {
        dispatch(fetchInvoicesSuccess([response.data])); // You can adjust this based on your needs
      })
      .catch(error => {
        console.error("There was an error fetching movie details!", error);
        dispatch(fetchInvoicesFailure(error));
      });
  };
};
// //Add
// export const addMovieSuccess = (movie) => ({
//   type: ADD_MOVIES_SUCCESS,
//   payload: movie,
// });

// export const addMovieFailure = (error) => ({
//   type: ADD_MOVIES_FAILURE,
//   payload: error.message || error.toString(),
// });

// export const addMovie = (movieData) => {
//   return (dispatch) => {
//     return axios.post("https://localhost:8000/api/Movies", movieData)
//       .then(response => {
//         dispatch(addMovieSuccess(response.data));
//       })
//       .catch(error => {
//         dispatch(addMovieFailure(error));
//       });
//   };
// };

//Count
export const fetchInvoicesCountSuccess = (count) => ({
  type: FETCH_INVOICES_COUNT_SUCCESS,
  payload: count,
});

export const fetchInvoicesCountFailure = (error) => ({
  type: FETCH_INVOICES_COUNT_FAILURE,
  payload: error.message || error.toString(),
});

export const fetchInvoicesCount = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get('https://localhost:5004/api/Schedule/Count', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Thêm token vào header của yêu cầu
        },
      });
      dispatch(fetchInvoicesCountSuccess(response.data));
    } catch (error) {
      dispatch(fetchInvoicesCountFailure(error));
    }
  };
};