import axios from "axios";
import { 
    FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, 
    FETCH_MOVIES_FAILURE,
    EDIT_MOVIES_SUCCESS,EDIT_MOVIES_FAILURE,
    ADD_MOVIES_SUCCESS, ADD_MOVIES_FAILURE
  } from "../types/type";
export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST
});

export const fetchMoviesSuccess = (customers) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: customers
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error.message || error.toString()
});

export const fetchMovies = () => {
  return (dispatch) => {
    dispatch(fetchMoviesRequest());
    return axios.get("https://localhost:8000/api/Movies")
      .then(response => {
        dispatch(fetchMoviesSuccess(response.data));
      })
      .catch(error => {
        console.error("There was an error!", error);
        dispatch(fetchMoviesFailure(error));
      });
  };
};
//Edit Movie
export const editMovieSuccess = (movie) => ({
  type: EDIT_MOVIES_SUCCESS,
  payload: movie,
});

export const editMovieFailure = (error) => ({
  type: EDIT_MOVIES_FAILURE,
  payload: error.message || error.toString(),
});

export const editMovie = (id, movieData) => {
  return (dispatch) => {
    return axios.put(`https://localhost:8000/api/Movies/${id}`, movieData)
      .then(response => {
        dispatch(editMovieSuccess(response.data));
      })
      .catch(error => {
        dispatch(editMovieFailure(error));
      });
  };
};
export const fetchMovieDetails = (id) => {
  return (dispatch) => {
    return axios.get(`https://localhost:8000/api/Movies/${id}`)
      .then(response => {
        dispatch(fetchMoviesSuccess([response.data])); // You can adjust this based on your needs
      })
      .catch(error => {
        console.error("There was an error fetching movie details!", error);
        dispatch(fetchMoviesFailure(error));
      });
  };
};
//Add
export const addMovieSuccess = (movie) => ({
  type: ADD_MOVIES_SUCCESS,
  payload: movie,
});

export const addMovieFailure = (error) => ({
  type: ADD_MOVIES_FAILURE,
  payload: error.message || error.toString(),
});

export const addMovie = (movieData) => {
  return (dispatch) => {
    return axios.post("https://localhost:8000/api/Movies", movieData)
      .then(response => {
        dispatch(addMovieSuccess(response.data));
      })
      .catch(error => {
        dispatch(addMovieFailure(error));
      });
  };
};
