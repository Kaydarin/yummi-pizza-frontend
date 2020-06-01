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
	Modal
} from "semantic-ui-react";
import Pizza from "./Pizza";
import { connect } from "react-redux";
import store from "../../reducer/store";
import _ from "lodash";
import {
	getStateTest,
	getPizza,
	getCurrency,
	getDeliveryCharge
} from "../../reducer/actions";
import "semantic-ui-css/semantic.min.css";
import "./sidebar-menu.css";
import { round } from "mathjs";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PizzaOrder from "../../features/PizzaOrder";
import SearchOrder from "../../features/SearchOrder";

class Main extends Component {
	render() {
		return (
			<BrowserRouter>
				<Sidebar.Pushable as={Segment} className="main">
					<Sidebar
						as={Menu}
						animation="push"
						icon="labeled"
						inverted
						vertical
						visible="visible"
						width="thin"
					>
						<Menu.Item as={Link} to="/">
							<Icon name="chart pie" />
							Pizzas
						</Menu.Item>
						<Menu.Item as={Link} to="/orders">
							<Icon name="clipboard list" />
							Orders
						</Menu.Item>
					</Sidebar>

					<Sidebar.Pusher style={{ minHeight: "100vh" }}>
						<Segment>
							<Header as="h2">Yummi Pizza</Header>
						</Segment>
						<Segment basic>
							<Switch>
								<Route exact path="/">
									<PizzaOrder />
								</Route>
								<Route path="/orders">
									<SearchOrder />
								</Route>
							</Switch>
						</Segment>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Main);
