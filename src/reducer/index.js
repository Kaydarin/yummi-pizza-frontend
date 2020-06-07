import { combineReducers } from "redux";
import initialState from "./store";

const globalState = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PIZZA":
			return {
				...state,
				pizza: action.data
			};
		case "SET_ORDER_HISTORY":
			return {
				...state,
				orderHistory: action.data
			};
		default:
			return state;
	}
};

export default combineReducers({
	stateData: globalState
});
