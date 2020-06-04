import React, { Component, Fragment } from "react";
import {
	Header,
	Grid,
	Input,
	Select,
	Button,
	Segment,
	Container,
	Icon,
	Divider
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./search-order.css";
import { connect } from "react-redux";
import { requestOrderHistory, getOrderHistory } from "../../reducer/actions";
import _ from "lodash";
import { round } from "mathjs";
import OrderCard from "./OrderCard";
import OrderDetail from "./OrderDetail";
import CartTable from "../../components/CartTable";

class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchSelectOptions: [
				{ key: "orderno", text: "Order Number", value: "order" },
				{ key: "phoneno", text: "Phone Number", value: "phone" }
			],
			searchSelectValue: "order",
			searchValue: "",
			allPizzaOrders: [],
			selectedOrderPizzas: [],
			selectedOrder: {
				selectedOrderNo: "",
				selectedOrderStatus: "",
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
			isSearching: false
		};
	}

	renderLoop = () => {
		const tags = [];

		for (var i = 1; i <= 50; i++) {
			tags.push(<p>test {i}</p>);
		}

		return tags;
	};

	handleSubmitSearch = async () => {
		this.setState({
			isSearching: true
		});

		const data = {
			by: this.state.searchSelectValue,
			query: this.state.searchValue
		};

		await this.props.dispatch(requestOrderHistory(data));
		const orderData = await this.props.dispatch(getOrderHistory());

		this.setState({
			allPizzaOrders: orderData,
			isSearching: false
		});

		console.log(orderData);
	};

	handleInputChange = event => {
		this.setState({
			searchValue: event.target.value
		});
	};

	setSelectInputValue = (event, data) => {
		this.setState({
			searchSelectValue: data.value
		});
	};

	renderStatus = status => {
		// placed, baking , delivering, completed
		if (status === "placed") {
			return "Order Placed";
		} else if (status === "baking") {
			return "Baking";
		} else if (status === "delivering") {
			return "Delivering";
		} else if (status === "completed") {
			return "Pizza Delivered";
		} else {
			return "Unknown";
		}
	};

	renderTotalAmount = pizzas => {
		return _.sumBy(pizzas, function(pizza) {
			return pizza.pizzacount * pizza.price;
		});
	};

	renderOrders = () => {
		if (_.isEmpty(this.state.allPizzaOrders)) {
			return (
				<Container textAlign="center" style={{ marginTop: "20px" }}>
					<Header as="h3" icon>
						<Icon name="search" />
						Nothing Listed Here
						<Header.Subheader>
							Try to use search function above.
						</Header.Subheader>
					</Header>
				</Container>
			);
		} else {
			return this.state.allPizzaOrders.map(order => (
				<OrderCard
					id={order.id}
					currency={order.currency}
					totalAmount={this.renderTotalAmount(order.pizza)}
					status={this.renderStatus(order.status)}
					viewOrder={() => this.viewOrder(order)}
				/>
			));
		}
	};

	viewOrder = order => {
		const pizzas = order.pizza;

		const pizzaPriceArr = [];

		for (let i = 0; i < pizzas.length; i++) {
			const price = parseFloat(pizzas[i]["price"]);
			const calculated = parseFloat(
				round(price * pizzas[i]["pizzacount"], 2).toFixed(2)
			);

			pizzaPriceArr.push(parseFloat(calculated));

			_.assign(pizzas[i], {
				deliverycharge: order.deliverycharge,
				currency: order.currency
			});
		}

		const total = _.sum(pizzaPriceArr);
		const deliveryCharge = parseFloat(order.deliverycharge);
		const totalPrice = parseFloat(round(total + deliveryCharge, 2)).toFixed(2);

		const orderObj = {
			selectedOrderNo: order.id,
			selectedOrderStatus: order.status,
			pizzaTotalPrice: totalPrice,
			deliveryCharge: order.deliverycharge,
			currency: order.currency,
			firstName: order.firstname,
			lastName: order.lastname,
			addressLine1: order.addressline1,
			addressLine2: order.addressline2,
			country: order.country,
			city: order.city,
			poscode: order.poscode,
			mainPhone: order.phoneno1,
			otherPhone: order.phoneno2
		};

		this.setState({
			selectedOrderPizzas: pizzas,
			selectedOrder: orderObj
		});
	};

	renderOrderDetail = () => {
		if (_.isEmpty(this.state.selectedOrderPizzas)) {
			return (
				<Container textAlign="center" style={{ marginTop: "20px" }}>
					<Header as="h3" icon>
						<Icon name="search" />
						Nothing Selected
						<Header.Subheader>
							Try to use search function on the left and click one of the
							results.
						</Header.Subheader>
					</Header>
				</Container>
			);
		} else {
			return (
				<Fragment>
					<OrderDetail
						isFirst={true}
						orderNo={this.state.selectedOrder.selectedOrderNo}
						orderStatus={this.renderStatus(
							this.state.selectedOrder.selectedOrderStatus
						)}
						firstName={this.state.selectedOrder.firstName}
						lastName={this.state.selectedOrder.lastName}
						addressLine1={this.state.selectedOrder.addressLine1}
						addressLine2={this.state.selectedOrder.addressLine2}
						city={this.state.selectedOrder.city}
						poscode={this.state.selectedOrder.poscode}
						country={this.state.selectedOrder.country}
						mainPhone={this.state.selectedOrder.mainPhone}
						otherPhone={this.state.selectedOrder.otherPhone}
					/>
					<Segment basic>
						<CartTable
							pizzas={this.state.selectedOrderPizzas}
							currency={this.state.selectedOrder.currency}
							isPizzaPriceCalculateIndividually={true}
							totalPrice={this.state.selectedOrder.pizzaTotalPrice}
							deliveryCharge={this.state.selectedOrder.deliveryCharge}
						/>
						<Divider style={{ marginBottom: "10px" }} />
					</Segment>
				</Fragment>
			);
		}
	};

	render() {
		return (
			<Segment basic>
				<Header as="h3">Search your order</Header>
				<Grid columns="equal">
					<Grid.Column>
						<Input type="text" placeholder="Search..." action>
							<Select
								compact
								options={this.state.searchSelectOptions}
								defaultValue="order"
								style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
								onChange={this.setSelectInputValue}
							/>
							<input
								className="inputText"
								style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
								value={this.state.searchValue}
								onChange={this.handleInputChange}
							/>
							<Button type="submit" onClick={this.handleSubmitSearch}>
								Search
							</Button>
						</Input>
						<Segment
							basic
							style={{
								overflow: "auto",
								height: "75vh",
								maxHeight: "75vh"
							}}
							loading={this.state.isSearching}
						>
							{this.renderOrders()}
							{/* {this.renderLoop()} */}
						</Segment>
					</Grid.Column>
					<Grid.Column width={11}>
						<Segment
							style={{
								width: "82%",
								padding: "2em 3em 2em 3em",
								overflow: "auto",
								height: "75vh",
								maxHeight: "75vh"
							}}
							loading={false}
						>
							{this.renderOrderDetail()}
						</Segment>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}
}

export default connect()(Orders);
