import axios from "axios";

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
		console.log(getState());
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

export const getUserInfo = () => {
	return async (dispatch, getState) => {
		return getState().stateData.userInfo;
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

export const requestPizza = payload => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get("http://127.0.0.1:8000/api/pizza");

			const data = response.data;

			dispatch({
				type: "SET_PIZZA",
				data
			});
		} catch (error) {
			console.log(error.response);
		}
	};
};

export const requestOrderPizza = payload => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/orderpizza",
				payload
			);

			const data = response.data;

			return data.orderNumber;
		} catch (error) {
			console.log(error.response);
		}
	};
};

export const requestOrderHistory = payload => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/order",
				payload
			);
			const data = response.data;
			dispatch({
				type: "SET_ORDER_HISTORY",
				data
			});
		} catch (error) {
			console.log(error.response);
		}
	};
};

export const getOrderHistory = () => {
	return async (dispatch, getState) => {
		return getState().stateData.orderHistory;
	};
};
