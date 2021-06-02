import api from "../../apiService";
import { routeActions } from "./route.actions.js";
import * as types from "../constants/auth.constants";
import { toast } from "react-toastify";

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });
    const res = await api.post("/user", data);
    dispatch(routeActions.redirect("/login"));
    dispatch({ type: types.REGISTER_SUCCESS, payload: res });
    toast.success(res.data.message + ". Please check mail to verify account.");
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error.message });
  }
};

const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    const res = await api.post("/auth/login", data);
    console.log(res);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data.data,
    });
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("role", res.data.data.user.role);

    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");

    dispatch(routeActions.redirect("/"));
    const name = res.data.data.user.name;
    toast.success(`Welcome back, ${name}`);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
  }
};
const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    api.defaults.headers.common["authorization"] = accessToken;
  }
  try {
    const res = await api.get("/user/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};
const updatetUser =
  (name, address, phone, avatarUrl, accessToken) => async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_USER_REQUEST, payload: null });
      const data = await api.put("/user", name, address, phone, avatarUrl);
      dispatch({ type: types.UPDATE_USER_SUCCESS, payload: data });
      toast.success(data.data.message);
      dispatch(routeActions.redirect("/admin"));
      dispatch(authActions.getCurrentUser(accessToken));
    } catch (error) {
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: error.message });
    }
  };
const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_USER_REQUEST, payload: null });
    const res = await api.get("/user");
    dispatch({
      type: types.GET_ALL_USER_SUCCESS,
      payload: res.data.data.users,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_USER_FAILURE, payload: error.message });
  }
};

const loginWithFb = (data) => async (dispatch) => {
  try {
  } catch (error) {}
};

const loginWithGg = (data) => async (dispatch) => {
  try {
  } catch (error) {}
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  localStorage.setItem("role", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

// const verify = (code) => async (dispatch) => {
//   try {
//     dispatch({ type: types.LOGOUT_REQUEST, payload: null });
//     const res = await api.post("/users/verify", { code });
//     dispatch({ type: types.LOGOUT_SUCCESS, payload: res });
//     toast.success(res.data.message);
//   } catch (error) {
//     dispatch({ type: types.LOGOUT_FAILURE, payload: error.message });
//   }
// };

export const authActions = {
  register,
  login,
  getCurrentUser,
  loginWithFb,
  loginWithGg,
  logout,
  updatetUser,
  getAllUser,
  // verify,
};
