import axios from "axios";
import {
    FETCH_SCHEDULES_REQUEST, FETCH_SCHEDULES_SUCCESS,
    FETCH_SCHEDULES_FAILURE,
    FETCH_SCHEDULES_BY_MOVIEID_REQUEST,
    FETCH_SCHEDULES_BY_MOVIEID_SUCCESS,
    FETCH_SCHEDULES_BY_MOVIEID_FAILURE,CLEAR_SCHEDULES
} from "../types/type";

export const fetchSchedulesRequest = () => ({
    type: FETCH_SCHEDULES_REQUEST
});

export const fetchSchedulesSuccess = (schedules) => {
    return {
        type: FETCH_SCHEDULES_SUCCESS,
        payload: schedules
    };
};

export const fetchSchedulesFailure = (error) => ({
    type: FETCH_SCHEDULES_FAILURE,
    payload: error.message || error.toString()
});

export const fetchSchedules = () => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.auth.token;
        const sysRole = state.auth.user ? state.auth.user.sysRole : null;

        dispatch(fetchSchedulesRequest());

        return axios.get("http://localhost:5003/api/Schedule", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Site-Type': sysRole || 'default',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                dispatch(fetchSchedulesSuccess(response.data));
            })
            .catch(error => {
                console.error("There was an error!", error.message);
                if (error.response && error.response.status === 401) {
                    dispatch(fetchSchedulesFailure("Unauthorized access"));
                } else if (error.response && error.response.status === 403) {
                    dispatch(fetchSchedulesFailure("Forbidden access"));
                } else {
                    dispatch(fetchSchedulesFailure(error));
                }
            });
    };
};
//Get Movie
export const fetchSchedulesByMovieIdRequest = () => ({
    type: FETCH_SCHEDULES_BY_MOVIEID_REQUEST,
});

export const fetchSchedulesByMovieIdSuccess = (schedules) => {
    console.log("Fetched schedule:", schedules);
    return (
        {
            type: FETCH_SCHEDULES_BY_MOVIEID_SUCCESS,
            payload: schedules,
        }
    )
};

export const fetchSchedulesByMovieIdFailure = (error) => ({
    type: FETCH_SCHEDULES_BY_MOVIEID_FAILURE,
    payload: error.message || error.toString(),
});

export const fetchSchedulesByMovieId = (movieId) => {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.auth.token;
        const sysRole = state.auth.user ? state.auth.user.sysRole : null;
        dispatch(fetchSchedulesRequest());

        return axios.get(`http://localhost:5003/api/Schedule/ByMovieId/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Site-Type': sysRole || 'default',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                dispatch(fetchSchedulesByMovieIdSuccess(response.data));
            })
            .catch(error => {
                console.error("There was an error fetching schedules by movie ID!", error.message);
                if (error.response && error.response.status === 401) {
                    dispatch(fetchSchedulesByMovieIdFailure("Unauthorized access"));
                } else if (error.response && error.response.status === 403) {
                    dispatch(fetchSchedulesByMovieIdFailure("Forbidden access"));
                } else {
                    dispatch(fetchSchedulesByMovieIdFailure(error));
                }
            });
    };
};
export const clearSchedules = () => ({
    type: CLEAR_SCHEDULES
});