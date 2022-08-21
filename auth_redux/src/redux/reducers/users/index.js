import { ACCESS_TOKEN_USER } from "../../types";

const initialState = {
  isLoading: false,
  token: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case ACCESS_TOKEN_USER:
      return {
        ...state,
        isLoading: true,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default users;
