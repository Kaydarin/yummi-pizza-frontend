import React, { Component } from "react";
import { Header, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "./app.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Pizzas from "./features/Pizzas/index";
import Orders from "./features/Orders/index";

class App extends Component {
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
						<Switch>
							<Route exact path="/">
								<Pizzas />
							</Route>
							<Route path="/orders">
								<Orders />
							</Route>
						</Switch>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);
