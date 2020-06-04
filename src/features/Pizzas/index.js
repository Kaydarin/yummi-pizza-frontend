import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { connect } from "react-redux";
import _ from "lodash";
import {
	requestPizza,
	getPizza,
	getCurrency,
	getDeliveryCharge,
	getUserInfo,
	requestOrderPizza
} from "../../reducer/actions";
import "semantic-ui-css/semantic.min.css";
import { round } from "mathjs";

class Pizzas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			currency: "",
			deliveryCharge: "",
			pizza: [],
			userInfo: {
				firstName: "",
				lastName: "",
				addressLine1: "",
				addressLine2: "",
				country: "",
				city: "",
				poscode: "",
				mainPhone: "",
				otherPhone: ""
			},
			userInfoValidate: {
				firstName: false,
				lastName: false,
				addressLine1: false,
				addressLine2: false,
				country: false,
				city: false,
				poscode: false,
				mainPhone: false,
				otherPhone: false
			},
			isPizzaLoading: false,
			isPizzaSelected: false,
			isWaitingSubmission: false,
			orderNumber: "",
			isOpenConfirmModal: false
		};
	}

	async componentDidMount() {
		this.clearOrder();

		this.setState({
			isPizzaLoading: true
		});

		await this.props.dispatch(requestPizza());
		/**
		 * getState() is for getting state data from Redux store
		 * and here we repopulate it in the localstate,
		 * if we destroy this component and render it again,
		 * we able to get full data from the localstate (as we should not, because component was destroyed),
		 * but not initial data from Redux store.
		 * Weird...
		 */
		const pizzaData = await this.props.dispatch(getPizza());
		const deliveryCharges = await this.props.dispatch(getDeliveryCharge());
		const currencyData = await this.props.dispatch(getCurrency());
		const userInfoData = await this.props.dispatch(getUserInfo()); // Try to fill the inputs, Go to Orders menu, then go back here. The state exists. Try comment this line and do the same thing. The state gone.

		this.setState(
			{
				pizza: pizzaData,
				deliveryCharge: deliveryCharges,
				currency: currencyData,
				userInfo: userInfoData,
				isPizzaLoading: false
			},
			async () => {
				const totalCount = _.sumBy(this.state.pizza, function(obj) {
					return obj.ordercount;
				});

				if (totalCount > 0) {
					this.setState({
						isPizzaSelected: true
					});
				}
			}
		);
	}

	addOrder = pizzaId => {
		const pizzas = this.state.pizza;

		_.map(pizzas, function(el) {
			if (el.id === pizzaId) {
				_.assign(el, { ordercount: el.ordercount + 1 });
			}
		});

		this.setState({
			pizza: pizzas,
			isPizzaSelected: true
		});
	};

	removeOrder = pizzaId => {
		const pizzas = this.state.pizza;

		_.map(pizzas, function(el) {
			if (el.id === pizzaId) {
				if (el.ordercount !== 0) {
					_.assign(el, { ordercount: el.ordercount - 1 });
				}
			}
		});

		const totalCount = _.sumBy(pizzas, function(obj) {
			return obj.ordercount;
		});

		if (totalCount <= 0) {
			this.setState({
				isPizzaSelected: false
			});
		}

		this.setState({
			pizza: pizzas
		});
	};

	renderTotalPrice = () => {
		const totalPrice = _.sumBy(this.state.pizza, function(obj) {
			return parseFloat(round(obj.price * obj.ordercount, 2).toFixed(2));
		});

		if (totalPrice > 0) {
			return parseFloat(
				round(totalPrice + this.state.deliveryCharge, 2).toFixed(2)
			);
		} else {
			return 0;
		}
	};

	clearOrder = () => {
		const pizzas = this.state.pizza;

		_.map(pizzas, function(el) {
			_.assign(el, { ordercount: 0 });
		});

		this.setState({
			pizza: pizzas,
			isPizzaSelected: false
		});
	};

	handleInputChange = (key, event) => {
		const user = this.state.userInfo;

		_.assign(user, { [key]: event.target.value });

		if (key === "poscode" || key === "mainPhone" || key === "otherPhone") {
			const numRegex = /^[0-9\b]+$/;

			if (event.target.value === "" || numRegex.test(event.target.value)) {
				this.setState({
					userInfo: user
				});
			}
		} else {
			this.setState({
				userInfo: user
			});
		}
	};

	handleSubmitOrder = async () => {
		const user = this.state.userInfo;
		const userValidate = this.state.userInfoValidate;

		if (user.firstName === "") {
			_.assign(userValidate, { firstName: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { firstName: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}

		if (user.lastName === "") {
			_.assign(userValidate, { lastName: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { lastName: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}

		if (user.addressLine1 === "") {
			_.assign(userValidate, { addressLine1: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { addressLine1: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}

		if (user.country === "") {
			_.assign(userValidate, { country: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { country: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}

		if (user.city === "") {
			_.assign(userValidate, { city: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { city: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}

		if (user.poscode === "") {
			_.assign(userValidate, { poscode: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { poscode: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}

		if (user.mainPhone === "") {
			_.assign(userValidate, { mainPhone: true });
			this.setState({
				userInfoValidate: userValidate
			});
		} else {
			_.assign(userValidate, { mainPhone: false });
			this.setState({
				userInfoValidate: userValidate
			});
		}
		if (
			_.some([this.state.userInfoValidate], {
				firstName: false,
				lastName: false,
				addressLine1: false,
				addressLine2: false,
				country: false,
				city: false,
				poscode: false,
				mainPhone: false,
				otherPhone: false
			})
		) {
			const pizzas = this.state.pizza;
			const newPizzasData = [];

			for (let i = 0; i < pizzas.length; i++) {
				const thisPizza = _.pick(pizzas[i], ["id", "ordercount"]);
				const thisNewPizza = _.mapKeys(thisPizza, function(value, key) {
					if (key === "ordercount") {
						return "count";
					}
					if (key === "id") {
						return "id";
					}
				});

				if (thisNewPizza.count !== 0) {
					newPizzasData.push(thisNewPizza);
				}
			}

			// newPizzasData.splice(-1); // Remove last empty object which Lodash somehow add one during loop

			let order = {
				user: {
					firstName: this.state.userInfo.firstName,
					lastName: this.state.userInfo.lastName,
					addressLine1: this.state.userInfo.addressLine1,
					addressLine2:
						this.state.userInfo.addressLine2 === ""
							? null
							: this.state.userInfo.addressLine2,
					country: this.state.userInfo.country,
					city: this.state.userInfo.city,
					poscode: this.state.userInfo.poscode,
					phoneNo1: this.state.userInfo.mainPhone,
					phoneNo2:
						this.state.userInfo.otherPhone === ""
							? null
							: this.state.userInfo.otherPhone
				},
				pizza: newPizzasData,
				currency: this.state.currency
			};

			this.setState({
				isWaitingSubmission: true
			});

			const orderNumber = await this.props.dispatch(requestOrderPizza(order));

			this.setState({
				isWaitingSubmission: false,
				orderNumber
			});

			this.goToNextStep(2);
		}
	};

	renderStep() {
		if (this.state.step === 0) {
			return (
				<StepOne
					isPizzaLoading={this.state.isPizzaLoading}
					isPizzaSelected={this.state.isPizzaSelected}
					pizza={this.state.pizza}
					currency={this.state.currency}
					deliveryCharge={this.state.deliveryCharge}
					renderTotalPrice={this.renderTotalPrice}
					addOrder={this.addOrder}
					removeOrder={this.removeOrder}
					clearOrder={this.clearOrder}
					goToNextStep={this.goToNextStep}
				/>
			);
		} else if (this.state.step === 1) {
			return (
				<StepTwo
					isErrorFirstName={this.state.userInfoValidate.firstName}
					firstName={this.state.userInfo.firstName}
					isErrorLastName={this.state.userInfoValidate.lastName}
					lastName={this.state.userInfo.lastName}
					isErrorAddressLine1={this.state.userInfoValidate.addressLine1}
					addressLine1={this.state.userInfo.addressLine1}
					addressLine2={this.state.userInfo.addressLine2}
					isErrorCountry={this.state.userInfoValidate.country}
					country={this.state.userInfo.country}
					isErrorCity={this.state.userInfoValidate.city}
					city={this.state.userInfo.city}
					isErrorPoscode={this.state.userInfoValidate.poscode}
					poscode={this.state.userInfo.poscode}
					isErrorMainPhone={this.state.userInfoValidate.mainPhone}
					mainPhone={this.state.userInfo.mainPhone}
					otherPhone={this.state.userInfo.otherPhone}
					handleInputChange={this.handleInputChange}
					handleSubmitOrder={this.handleSubmitOrder}
					goToNextStep={this.goToNextStep}
					pizza={this.state.pizza}
					currency={this.state.currency}
					deliveryCharge={this.state.deliveryCharge}
					renderTotalPrice={this.renderTotalPrice}
				/>
			);
		} else if (this.state.step === 2) {
			return (
				<StepThree
					orderNumber={this.state.orderNumber}
					goToNextStep={this.goToNextStep}
				/>
			);
		}
	}

	goToNextStep = step => {
		const totalPrice = _.sumBy(this.state.pizza, function(obj) {
			return parseFloat(round(obj.price * obj.ordercount, 2).toFixed(2));
		});

		if (totalPrice > 0) {
			this.setState(state => ({
				step,
				isPizzaSelected: true
			}));
		} else {
			this.setState(state => ({
				isPizzaSelected: false
			}));
		}

		if (step === 0) {
			this.clearOrder();
		}
	};

	render() {
		return (
			<Segment basic loading={this.state.isWaitingSubmission}>
				{this.renderStep()}
			</Segment>
		);
	}
}

export default connect()(Pizzas);
