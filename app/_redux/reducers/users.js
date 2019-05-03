import { userConstants } from "../_constants";

const { LOGIN, REGISTER, LOGOUT } = userConstants;

const INITIAL_STATE = {
  data: {},
  access_token: {},
  isLoggedIn: false,
  isLoading: false,
  error: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload.data.user,
        access_token: action.payload.data.access_token,
        isLoggedIn: true
      };
    case LOGIN + "_REJECTED":
      return {
        ...state,
        ...INITIAL_STATE
      };

    case REGISTER + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case REGISTER + "_FULFILLED":
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload.data.user,
        access_token: action.payload.data.access_token,
        isLoggedIn: true
      };
    case REGISTER + "_REJECTED":
      return {
        ...state,
        ...INITIAL_STATE
      };
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
