import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import routeReducers from "./route.reducers";
import productReducers from "./product.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducers,
  route: routeReducers,
});

export default rootReducer;
