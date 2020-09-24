import { combineReducers } from "redux";

import authReducer from "./authReducer";
import regSuccessReducer from "./regReducer";

export default combineReducers({
	auth: authReducer,
	regSuccess: regSuccessReducer,
});
