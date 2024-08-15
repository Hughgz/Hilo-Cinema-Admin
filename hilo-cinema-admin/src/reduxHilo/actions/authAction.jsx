import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/type';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await fetch('https://localhost:4000/api/EmployeeAuthen/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.message || 'Login failed');
      }

      const data = await response.json();

      // Lưu JWT và thông tin Employee vào localStorage
      localStorage.setItem('token', data.jwtToken);
      localStorage.setItem('user', JSON.stringify(data.employee)); // Lưu toàn bộ đối tượng employee

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: data.jwtToken,
          user: data.employee, // Gán toàn bộ employee vào user
        },
      });
    } catch (error) {
      console.error("There was an error!", error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    // Xóa JWT và thông tin người dùng từ localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Dispatch hành động LOGOUT để cập nhật state trong reducer
    dispatch({ type: LOGOUT });
  };
};
