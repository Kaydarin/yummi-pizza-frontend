import { combineReducers } from "redux";
import initialState from "./store";

const globalState = (state = initialState, action) => {
	switch (action.type) {
		case "ACTIVATE_GEOD":
			return action.geod;
		case "CLOSE_GEOD":
			return {};
		default:
			return state;
	}
};

export default combineReducers({
	stateData: globalState
});
