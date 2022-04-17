import { LOGIN_SUCCESS } from "../../types";

const initialState = {
  authReducersResult: false,
  authReducersLoading: false,
  authReducersError: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("4. Berhasil KeReduser", action);
      return {
        ...state,
        authReducersResult: action.payload.data,
        authReducersLoading: action.payload.loading,
        authReducersError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default auth;
