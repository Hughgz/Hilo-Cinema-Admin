import axios from "axios";
import {
    FETCH_SEATS_REQUEST, FETCH_SEATS_SUCCESS,
    FETCH_SEATS_FAILURE,
    ADD_SEATS_SUCCESS, ADD_SEATS_FAILURE
} from "../types/type";
export const fetchSeatsRequest = () => ({
    type: FETCH_SEATS_REQUEST
});

export const fetchSeatsSuccess = (customers) => ({
    type: FETCH_SEATS_SUCCESS,
    payload: customers
});

export const fetchSeatsFailure = (error) => ({
    type: FETCH_SEATS_FAILURE,
    payload: error.message || error.toString()
});

export const fetchSeats = () => {
    return (dispatch) => {
        dispatch(fetchSeatsRequest());
        return axios.get("http://localhost:5002/api/Seats")
            .then(response => {
                dispatch(fetchSeatsSuccess(response.data));
            })
            .catch(error => {
                console.error("There was an error!", error);
                dispatch(fetchSeatsFailure(error));
            });
    };
};
export const fetchSeatsByRoom = (roomId) => {
  return (dispatch) => {
    // Reset lỗi khi bắt đầu fetch ghế mới
    dispatch(fetchSeatsRequest());

    return axios
      .get(`http://localhost:5002/api/Seats/GetSeatsByRoom/${roomId}`)
      .then((response) => {
        dispatch(fetchSeatsSuccess(response.data));
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response && error.response.status === 404) {
          dispatch(fetchSeatsFailure("Room này chưa có ghế, vui lòng thêm ghế"));
        } else {
          dispatch(fetchSeatsFailure(error.message || "Có lỗi xảy ra"));
        }
      });
  };
};

//Edit Seat
// export const editSeatSuccess = (Seat) => ({
//   type: EDIT_SeatS_SUCCESS,
//   payload: Seat,
// });

// export const editSeatFailure = (error) => ({
//   type: EDIT_SeatS_FAILURE,
//   payload: error.message || error.toString(),
// });

// export const editSeat = (id, SeatData) => {
//   return (dispatch) => {
//     return axios.put(`https://localhost:8000/api/Seats/${id}`, SeatData)
//       .then(response => {
//         dispatch(editSeatSuccess(response.data));
//       })
//       .catch(error => {
//         dispatch(editSeatFailure(error));
//       });
//   };
// };
// export const fetchSeatDetails = (id) => {
//   return (dispatch) => {
//     return axios.get(`https://localhost:8000/api/Seats/${id}`)
//       .then(response => {
//         dispatch(fetchSeatsSuccess([response.data])); // You can adjust this based on your needs
//       })
//       .catch(error => {
//         console.error("There was an error fetching Seat details!", error);
//         dispatch(fetchSeatsFailure(error));
//       });
//   };
// };
//Add
export const addSeatSuccess = (seat) => ({
    type: ADD_SEATS_SUCCESS,
    payload: seat,
});

export const addSeatFailure = (error) => ({
    type: ADD_SEATS_FAILURE,
    payload: error.message || error.toString(),
});

export const addSeat = (seatData) => {
    return (dispatch) => {
        return axios.post("http://localhost:5002/api/Seats", seatData)
            .then(response => {
                dispatch(addSeatSuccess(response.data));
            })
            .catch(error => {
                dispatch(addSeatFailure(error));
            });
    };
};
export const saveSeats = (seats) => {
    return async (dispatch) => {
      try {
        const seatData = seats.map(seat => ({
          roomId: seat.roomId,
          colSeat: seat.colSeat,
          rowSeat: seat.rowSeat,
          name: seat.name,
          type: seat.type || 'standard',
          status: seat.status || 'available'
        }));
        
        const response = await axios.post("http://localhost:5002/api/Seats", seatData);
  
        dispatch({
          type: ADD_SEATS_SUCCESS,
          payload: response.data,
        });
  
        return Promise.resolve(response.data); // Trả về thành công
      } catch (error) {
        console.error("There was an error saving seats!", error);
  
        dispatch({
          type: ADD_SEATS_FAILURE,
          payload: error.response?.data || error.message || error.toString(),
        });
  
        return Promise.reject(error); // Trả về lỗi
      }
    };
  };