import { combineReducers } from "redux";
import initialState from "./store";

const globalState = (state = initialState, action) => {
	switch (action.type) {
		case "ACTIVATE_GEOD":
			return action.geod;
		case "CLOSE_GEOD":
			return {};
		case "SET_PIZZA":
			return {
				...initialState,
				pizza: action.data
			};
		case "SET_ORDER_HISTORY":
			return {
				...initialState,
				orderHistory: action.data
			};
		default:
			return state;
	}
};

export default combineReducers({
	stateData: globalState
});
