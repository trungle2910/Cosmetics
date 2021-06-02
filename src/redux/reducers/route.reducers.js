import * as types from "../constants/route.constants";

const initialState = {
  redirectTo: null,
};

const routeReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.REDIRECT_TO:
      state.redirectTo = payload;
      break;

    case types.REMOVE_REDIRECT_TO:
      state.redirectTo = null;
      break;

    default:
      return state;
  }

  return { ...state };
};

export default routeReducers;
