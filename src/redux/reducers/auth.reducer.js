import * as types from "../constants/auth.constants";
const isAuthenticated = !!localStorage.getItem("accessToken");
const initialState = {
  user: {},
  allUser: [],
  isAuthenticated,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_FAILURE:
    case types.GET_ALL_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUser: action.payload,
        loading: false,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };
    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isAuthenticated: true,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
