import React, { Component, Fragment } from "react";
import {
	Header,
	Icon,
	Image,
	Menu,
	Segment,
	Sidebar,
	Grid,
	Button,
	Container,
	Divider,
	Table,
	Checkbox,
	Form,
	Modal,
	Statistic
} from "semantic-ui-react";
import Pizza from "./Pizza";
import { connect } from "react-redux";
import store from "../reducer/store";
import _ from "lodash";
import {
	getStateTest,
	getPizza,
	getCurrency,
	getDeliveryCharge,
	getUserInfo
} from "../reducer/actions";
import "semantic-ui-css/semantic.min.css";
import { round } from "mathjs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class PizzaOrder extends Component {
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
			isPizzaSelected: false,
			isOpenConfirmModal: false
		};
	}

	async componentDidMount() {
		const user = this.state.userInfo;

		const fname = "firstName";

		console.log(user[fname]);
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
				userInfo: userInfoData
			},
			async () => {
				const totalCount = _.sumBy(this.state.pizza, function(obj) {
					return obj.orderCount;
				});

				if (totalCount > 0) {
					this.setState({
						isPizzaSelected: true
					});
				}
			}
		);
	}

	pizzaList() {
		for (let i = 0; this.state.pizza.length > 0; i++) {
			return (
				<Grid.Column>
					<Pizza />
				</Grid.Column>
			);
		}
	}

	addOrder = pizzaId => {
		const pizzas = this.state.pizza;
		// const pizzaOrders = this.state.pizzaOrder;

		_.map(pizzas, function(el) {
			if (el.id === pizzaId) {
				_.assign(el, { orderCount: el.orderCount + 1 });

				// if (!_.some(pizzaOrders, { id: pizzaId })) {
				// 	pizzaOrders.push(el);
				// } else {
				// 	_.assign(pizzaOrders, { orderCount: pizzaOrders.orderCount + 1 });
				// }
			}
		});

		this.setState({
			pizza: pizzas,
			isPizzaSelected: true
		});

		console.log(this.state);
	};

	removeOrder = pizzaId => {
		const pizzas = this.state.pizza;
		// const pizzaOrders = this.state.pizzaOrder;

		_.map(pizzas, function(el) {
			if (el.id === pizzaId) {
				if (el.orderCount !== 0) {
					_.assign(el, { orderCount: el.orderCount - 1 });
					// if (_.some(pizzaOrders, { id: pizzaId })) {
					// 	const pizzaOrderArrKey = _.findIndex(pizzaOrders, function(obj) {
					// 		return obj.id === pizzaId;
					// 	});
					// 	if (pizzaOrders[pizzaOrderArrKey].orderCount === 1) {
					// 		// console.log("1");
					// 		_.filter(pizzaOrders, function(el) {
					// 			return el.id !== pizzaId;
					// 		});
					// 	} else if (pizzaOrders.orderCount !== 0) {
					// 		// console.log("not zero");
					// 		_.assign(pizzaOrders, { orderCount: pizzaOrders.orderCount - 1 });
					// 	}
					// }
					// console.log(pizzaOrders);
				}
			}
		});

		const totalCount = _.sumBy(pizzas, function(obj) {
			return obj.orderCount;
		});
		if (totalCount <= 0) {
			this.setState({
				isPizzaSelected: false
			});
		}

		// _.map(pizzaOrders, function(el) {
		// 	if (el.id === pizzaId) {
		// 		// console.log("pizza order");
		// 		// console.log(el.id);
		// 		// console.log(el.orderCount);
		// 		// if (el.orderCount === 1) {
		// 		// 	_.remove(pizzaOrders, function(obj) {
		// 		// 		return obj.id === pizzaId;
		// 		// 	});
		// 		// }
		// 		// if (el.orderCount !== 0) {
		// 		// 	_.assign(el, { orderCount: el.orderCount - 1 });
		// 		// }
		// 	}
		// });

		this.setState(
			{
				pizza: pizzas
			},
			() => {
				// Callback called when state change has been applied

				// Prints the latest state for hero.name
				console.log(this.state.pizzaOrder);
			}
		);
	};

	renderTotalPrice = () => {
		// const totalPrice = _.sumBy(this.state.pizza, function(obj) {
		// 	return obj.price * obj.orderCount;
		// });

		const totalPrice = _.sumBy(this.state.pizza, function(obj) {
			return parseFloat(round(obj.price * obj.orderCount, 2).toFixed(2));
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
			_.assign(el, { orderCount: 0 });
		});

		this.setState({
			pizza: pizzas,
			isPizzaSelected: false
		});
	};

	handleInputChange = (key, event) => {
		const user = this.state.userInfo;

		_.assign(user, { [key]: event.target.value });

		if (key == "poscode" || key == "mainPhone" || key == "otherPhone") {
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

		// _.assign(user, { [key]: event.target.value });

		// this.setState({
		// 	userInfo: user
		// });
	};

	handleInputValidation = (key, event) => {
		console.log(event.charCode);
	};

	handleSubmitOrder = () => {
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
			// this.setState({
			// 	isOpenConfirmModal: true
			// });
			this.goToNextStep(2);
			this.clearOrder();
		}
	};

	renderStep() {
		if (this.state.step === 0) {
			return (
				<Fragment>
					<Grid columns={2}>
						<Grid.Column width={10}>
							<Grid columns={2} divided>
								<Grid.Row>
									<Grid.Column width={15}>
										<Header as="h3">Select your pizzas</Header>
										<Grid container columns={3}>
											{this.state.pizza.map(pizza => (
												<Grid.Column>
													<Pizza
														id={pizza.id}
														name={pizza.name}
														price={pizza.price}
														currency={this.state.currency}
														description={pizza.description}
														img={pizza.img}
														addOrder={this.addOrder}
														removeOrder={this.removeOrder}
														orderCount={pizza.orderCount}
													/>
												</Grid.Column>
											))}
										</Grid>
									</Grid.Column>
									<Grid.Column width={1}></Grid.Column>
								</Grid.Row>
							</Grid>
						</Grid.Column>
						<Grid.Column
							width={5}
							style={{ marginLeft: "-45px", paddingRight: "30px" }}
						>
							<div style={{ marginLeft: "" }}>
								<Header as="h3">Your selected pizzas</Header>
								<p>None</p>
								<Table basic="very">
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Pizza(s)</Table.HeaderCell>
											<Table.HeaderCell>Quantity</Table.HeaderCell>
											<Table.HeaderCell>Price</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										{this.state.pizza.map(pizza => {
											if (pizza.orderCount > 0) {
												return (
													<Table.Row>
														<Table.Cell>{pizza.name}</Table.Cell>
														<Table.Cell>{pizza.orderCount}</Table.Cell>
														<Table.Cell>
															{this.state.currency === "USD" ? "$" : "&"}
															{parseFloat(
																round(
																	pizza.price * pizza.orderCount,
																	2
																).toFixed(2)
															)}
														</Table.Cell>
													</Table.Row>
												);
											}
										})}
									</Table.Body>
									<Table.Footer>
										<Table.Row>
											<Table.HeaderCell />
											<Table.HeaderCell>Total</Table.HeaderCell>
											<Table.HeaderCell>
												{this.state.currency === "USD" ? "$" : "&"}
												{this.renderTotalPrice()}
											</Table.HeaderCell>
										</Table.Row>
									</Table.Footer>
									<Table.Footer>
										<Table.Row>
											<Table.HeaderCell />
											<Table.HeaderCell>Delivery charges</Table.HeaderCell>
											<Table.HeaderCell>
												{this.state.currency === "USD" ? "$" : "&"}
												{this.state.deliveryCharge}
											</Table.HeaderCell>
										</Table.Row>
									</Table.Footer>
								</Table>
								<Grid columns="equal">
									<Grid.Column>
										<Button
											content="Clear"
											style={{ marginRight: "5%", width: "80%" }}
											onClick={this.clearOrder}
										/>
									</Grid.Column>
									<Grid.Column>
										<Button
											content="Next"
											icon="right arrow"
											labelPosition="right"
											floated="right"
											style={{ marginRight: "5%", width: "80%" }}
											disabled={!this.state.isPizzaSelected}
											onClick={() => this.goToNextStep(1)}
										/>
									</Grid.Column>
								</Grid>
							</div>
						</Grid.Column>
					</Grid>
				</Fragment>
			);
		} else if (this.state.step === 1) {
			return (
				<Fragment>
					<Header as="h3">Confirm your order</Header>
					<Segment.Group horizontal style={{ width: "89%" }}>
						<Segment style={{ padding: "2em 3em 2em 3em" }}>
							<Header as="h4">Insert Info:-</Header>
							<Form>
								<Form.Group widths="equal">
									<Form.Field
										required={true}
										error={this.state.userInfoValidate.firstName}
									>
										<label>First Name</label>
										<input
											placeholder="First Name"
											value={this.state.userInfo.firstName}
											onChange={e => this.handleInputChange("firstName", e)}
										/>
									</Form.Field>
									<Form.Field
										required={true}
										error={this.state.userInfoValidate.lastName}
									>
										<label>Last Name</label>
										<input
											placeholder="Last Name"
											value={this.state.userInfo.lastName}
											onChange={e => this.handleInputChange("lastName", e)}
										/>
									</Form.Field>
								</Form.Group>
								<Form.Field
									required={true}
									error={this.state.userInfoValidate.addressLine1}
								>
									<label>Address Line 1</label>
									<input
										placeholder="Address Line 1"
										value={this.state.userInfo.addressLine1}
										onChange={e => this.handleInputChange("addressLine1", e)}
									/>
								</Form.Field>
								<Form.Field>
									<label>Address Line 2</label>
									<input
										placeholder="Address Line 2"
										value={this.state.userInfo.addressLine2}
										onChange={e => this.handleInputChange("addressLine2", e)}
									/>
								</Form.Field>
								<Form.Group widths="equal">
									<Form.Field
										required={true}
										error={this.state.userInfoValidate.country}
									>
										<label>Country</label>
										<input
											placeholder="Country"
											value={this.state.userInfo.country}
											onChange={e => this.handleInputChange("country", e)}
										/>
									</Form.Field>
									<Form.Field
										required={true}
										error={this.state.userInfoValidate.city}
									>
										<label>City</label>
										<input
											placeholder="City"
											value={this.state.userInfo.city}
											onChange={e => this.handleInputChange("city", e)}
										/>
									</Form.Field>
									<Form.Field
										required={true}
										error={this.state.userInfoValidate.poscode}
									>
										<label>Postal Code</label>
										<input
											placeholder="Postal Code"
											value={this.state.userInfo.poscode}
											onChange={e => this.handleInputChange("poscode", e)}
										/>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field
										required={true}
										error={this.state.userInfoValidate.mainPhone}
									>
										<label>Phone Number</label>
										<input
											placeholder="Phone Number"
											value={this.state.userInfo.mainPhone}
											onChange={e => this.handleInputChange("mainPhone", e)}
										/>
									</Form.Field>
									<Form.Field>
										<label>Other Phone Number</label>
										<input
											placeholder="Other Phone Number"
											value={this.state.userInfo.otherPhone}
											onChange={e => this.handleInputChange("otherPhone", e)}
										/>
									</Form.Field>
								</Form.Group>
								<Form.Field required={true}>
									<Checkbox label="I agree to the Terms and Conditions" />
								</Form.Field>
								<Modal open={this.state.isOpenConfirmModal}>
									<Modal.Header>Confirm Order?</Modal.Header>
									<Modal.Content>
										<Modal.Description>
											<Header>Here's your order:-</Header>
											<Table basic="very">
												<Table.Header>
													<Table.Row>
														<Table.HeaderCell>Pizza(s)</Table.HeaderCell>
														<Table.HeaderCell>Quantity</Table.HeaderCell>
														<Table.HeaderCell>Price</Table.HeaderCell>
													</Table.Row>
												</Table.Header>

												<Table.Body>
													{this.state.pizza.map(pizza => {
														if (pizza.orderCount > 0) {
															return (
																<Table.Row>
																	<Table.Cell>{pizza.name}</Table.Cell>
																	<Table.Cell>{pizza.orderCount}</Table.Cell>
																	<Table.Cell>
																		{this.state.currency === "USD" ? "$" : "&"}
																		{parseFloat(
																			round(
																				pizza.price * pizza.orderCount,
																				2
																			).toFixed(2)
																		)}
																	</Table.Cell>
																</Table.Row>
															);
														}
													})}
												</Table.Body>
												<Table.Footer>
													<Table.Row>
														<Table.HeaderCell />
														<Table.HeaderCell>Total</Table.HeaderCell>
														<Table.HeaderCell>
															{this.state.currency === "USD" ? "$" : "&"}
															{this.renderTotalPrice()}
														</Table.HeaderCell>
													</Table.Row>
												</Table.Footer>
												<Table.Footer>
													<Table.Row>
														<Table.HeaderCell />
														<Table.HeaderCell>
															Delivery charges
														</Table.HeaderCell>
														<Table.HeaderCell>
															{this.state.currency === "USD" ? "$" : "&"}
															{this.state.deliveryCharge}
														</Table.HeaderCell>
													</Table.Row>
												</Table.Footer>
											</Table>
											<p>If all is well, you can click button below...</p>
											<Button.Group widths={2}>
												<Button
													negative
													onClick={() =>
														this.setState({ isOpenConfirmModal: false })
													}
												>
													No
												</Button>
												<Button.Or />
												<Button
													positive
													onClick={() => {
														this.setState({ isOpenConfirmModal: false });
														this.goToNextStep(2);
													}}
												>
													Confirm
												</Button>
											</Button.Group>
										</Modal.Description>
									</Modal.Content>
								</Modal>
								<Button.Group widths={2}>
									<Button positive onClick={this.handleSubmitOrder}>
										Submit Order
									</Button>
									<Button.Or />
									<Button negative onClick={() => this.goToNextStep(0)}>
										Go Back
									</Button>
								</Button.Group>
								{/* <Button type="submit" onClick={this.handleSubmitOrder}>
									Submit Order
								</Button>
								<Button
									type="submit"
									floated="right"
									onClick={() => this.goToNextStep(0)}
								>
									Go back
								</Button> */}
							</Form>
						</Segment>
						<Segment style={{ padding: "2em 3em 2em 3em" }}>
							<Header as="h4">Your Order:-</Header>
							<Table basic="very">
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Pizza(s)</Table.HeaderCell>
										<Table.HeaderCell>Quantity</Table.HeaderCell>
										<Table.HeaderCell>Price</Table.HeaderCell>
									</Table.Row>
								</Table.Header>

								<Table.Body>
									{this.state.pizza.map(pizza => {
										if (pizza.orderCount > 0) {
											return (
												<Table.Row>
													<Table.Cell>{pizza.name}</Table.Cell>
													<Table.Cell>{pizza.orderCount}</Table.Cell>
													<Table.Cell>
														{this.state.currency === "USD" ? "$" : "&"}
														{parseFloat(
															round(pizza.price * pizza.orderCount, 2).toFixed(
																2
															)
														)}
													</Table.Cell>
												</Table.Row>
											);
										}
									})}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell />
										<Table.HeaderCell>Total</Table.HeaderCell>
										<Table.HeaderCell>
											{this.state.currency === "USD" ? "$" : "&"}
											{this.renderTotalPrice()}
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell />
										<Table.HeaderCell>Delivery charges</Table.HeaderCell>
										<Table.HeaderCell>
											{this.state.currency === "USD" ? "$" : "&"}
											{this.state.deliveryCharge}
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						</Segment>
					</Segment.Group>
				</Fragment>
			);
		} else if (this.state.step === 2) {
			return (
				<Fragment>
					<Segment placeholder style={{ width: "89%" }}>
						<Header icon>
							<Icon name="like" />
							<Statistic>
								<Statistic.Label>Thank you!</Statistic.Label>
								<p style={{ marginTop: "20px" }}>Your order number is</p>
								<Statistic.Value>101</Statistic.Value>
							</Statistic>
							<p>
								You can track your order by check on the 'Orders' menu on the
								left.
							</p>
						</Header>
						<Segment.Inline>
							<Button primary as={Link} to="/orders">
								Orders
							</Button>
							<Button onClick={() => this.goToNextStep(0)}>Main Menu</Button>
						</Segment.Inline>
					</Segment>
				</Fragment>
			);
		}
	}

	goToNextStep = step => {
		const totalPrice = _.sumBy(this.state.pizza, function(obj) {
			return parseFloat(round(obj.price * obj.orderCount, 2).toFixed(2));
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
	};

	render() {
		return this.renderStep();
	}
}

export default connect()(PizzaOrder);
