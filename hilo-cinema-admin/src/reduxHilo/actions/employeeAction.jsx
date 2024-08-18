import axios from "axios";
import { 
  FETCH_EMPLOYEES_REQUEST, FETCH_EMPLOYEES_SUCCESS, 
  FETCH_EMPLOYEES_FAILURE, EDIT_EMPLOYEE_SUCCESS, 
  EDIT_EMPLOYEE_FAILURE, ADD_EMPLOYEE_SUCCESS, 
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_STATUS_SUCCESS, 
  UPDATE_EMPLOYEE_STATUS_FAILURE,
  FETCH_MOVIES_COUNT_SUCCESS, FETCH_MOVIES_COUNT_FAILURE 
} from "../types/type";


// Fetch employees actions
export const fetchEmployeesRequest = () => ({
  type: FETCH_EMPLOYEES_REQUEST,
});

export const fetchEmployeesSuccess = (employees) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchEmployeesFailure = (error) => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error.message || error.toString(),
});

export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch(fetchEmployeesRequest());
    return axios.get("https://localhost:8000/api/Employees")
      .then(response => {
        dispatch(fetchEmployeesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchEmployeesFailure(error));
      });
  };
};

// Edit employee actions
export const editEmployeeSuccess = (employee) => ({
  type: EDIT_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const editEmployeeFailure = (error) => ({
  type: EDIT_EMPLOYEE_FAILURE,
  payload: error.message || error.toString(),
});

export const editEmployee = (id, employeeData) => {
  return (dispatch) => {
    return axios.put(`https://localhost:8000/api/Employees/${id}`, employeeData)
      .then(response => {
        dispatch(editEmployeeSuccess(response.data));
      })
      .catch(error => {
        dispatch(editEmployeeFailure(error));
      });
  };
};
//Add Employee
export const addEmployeeSuccess = (employee) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const addEmployeeFailure = (error) => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload: error.message || error.toString(),
});

export const addEmployee = (employeeData) => {
  return (dispatch) => {
    return axios.post("https://localhost:8000/api/Employees", employeeData)
      .then(response => {
        dispatch(addEmployeeSuccess(response.data));
      })
      .catch(error => {
        dispatch(addEmployeeFailure(error));
      });
  };
};

//hidden
export const updateEmployeeStatusSuccess = (employee) => ({
  type: UPDATE_EMPLOYEE_STATUS_SUCCESS,
  payload: employee,
});

export const updateEmployeeStatusFailure = (error) => ({
  type: UPDATE_EMPLOYEE_STATUS_FAILURE,
  payload: error.message || error.toString(),
});

export const updateEmployeeStatus = (id) => {
  return (dispatch) => {
    return axios.put(
      `https://localhost:8000/api/Employees/hidden/${id}`,
      {}, // Không cần truyền dữ liệu trong body
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      dispatch(updateEmployeeStatusSuccess(response.data.employee));
    })
    .catch(error => {
      dispatch(updateEmployeeStatusFailure(error));
    });
  };
};
//Count
export const fetchEmployeesCountSuccess = (count) => ({
  type: FETCH_MOVIES_COUNT_SUCCESS,
  payload: count,
});

export const fetchEmployeesCountFailure = (error) => ({
  type: FETCH_MOVIES_COUNT_FAILURE,
  payload: error.message || error.toString(),
});

export const fetchEmployeesCount = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const token = state.auth.token;  // Giả sử token được lưu trữ trong state.auth.token

      const response = await axios.get('https://localhost:8000/api/Employees/Count', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Thêm token vào header của yêu cầu
        },
      });
      dispatch(fetchEmployeesCountSuccess(response.data));
    } catch (error) {
      dispatch(fetchEmployeesCountFailure(error));
    }
  };
};