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
	Divider
} from "semantic-ui-react";
import Pizza from "./Pizza";
import "semantic-ui-css/semantic.min.css";
import "./sidebar-menu.css";

class SidebarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			pizza: [
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					meta: "A very nice pizza.",
					description: "Some nice toppings included."
				}
			]
		};
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
													<Pizza />
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
								<Button
									content="Next"
									icon="right arrow"
									labelPosition="right"
									style={{ marginRight: "5%" }}
									onClick={this.goToNextStep.bind(this)}
								/>
							</div>
						</Grid.Column>
					</Grid>
				</Fragment>
			);
		} else if (this.state.step === 1) {
			return (
				<Fragment>
					<Header as="h3">Check your shopping</Header>
					<Grid container columns={4}>
						<Grid.Column>
							<p>pizza 1</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 2</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 3</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 4</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 5</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 6</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 7</p>
						</Grid.Column>
						<Grid.Column>
							<p>pizza 8</p>
						</Grid.Column>
					</Grid>
				</Fragment>
			);
		}
	}

	goToNextStep() {
		this.setState(state => ({
			step: state.step + 1
		}));
	}

	render() {
		return (
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
					<Menu.Item as="a">
						<Icon name="chart pie" />
						Pizzas
					</Menu.Item>
					<Menu.Item as="a">
						<Icon name="clipboard list" />
						Orders
					</Menu.Item>
				</Sidebar>

				<Sidebar.Pusher style={{ minHeight: "100vh" }}>
					<Segment>
						<Header as="h2">Yummi Pizza</Header>
					</Segment>
					<Segment basic>{this.renderStep()}</Segment>
					<Container textAlign="right">
						<Button
							content="Next"
							icon="right arrow"
							labelPosition="right"
							style={{ marginRight: "5%" }}
							onClick={this.goToNextStep.bind(this)}
						/>
					</Container>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}

export default SidebarMenu;
