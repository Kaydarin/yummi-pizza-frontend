export const activateGeod = geod => ({
	type: "ACTIVATE_GEOD",
	geod
});

export const closeGeod = () => ({
	type: "CLOSE_GEOD"
});

// export const getStateTest = () => ({
// 	type: "GET_STATE_TEST"
// });

export const getPizza = () => {
	return async (dispatch, getState) => {
		// dispatch({
		//   type: "GET_STATE_TEST"
		// });
		// console.log("state is");
		// console.log(getState().stateData);
		return getState().stateData.pizza;
	};
};

export const getCurrency = () => {
	return async (dispatch, getState) => {
		return getState().stateData.currency;
	};
};

export const getDeliveryCharge = () => {
	return async (dispatch, getState) => {
		return getState().stateData.deliveryCharge;
	};
};

export const getStateTest = () => {
	return async (dispatch, getState) => {
		// dispatch({
		//   type: "GET_STATE_TEST"
		// });
		return getState().geod;
	};
};
