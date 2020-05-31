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
	Form
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
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
					description: "Some nice toppings included."
				},
				{
					name: "Pepperoni Pizza",
					price: "$99.99",
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
								<Table basic="very">
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Pizza(s)</Table.HeaderCell>
											<Table.HeaderCell>Quantity</Table.HeaderCell>
											<Table.HeaderCell>Price</Table.HeaderCell>
										</Table.Row>
									</Table.Header>

									<Table.Body>
										<Table.Row>
											<Table.Cell>Pepperoni Pizza</Table.Cell>
											<Table.Cell>20</Table.Cell>
											<Table.Cell>$4999.99</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Pepperoni Pizza</Table.Cell>
											<Table.Cell>20</Table.Cell>
											<Table.Cell>$4999.99</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell>Pepperoni Pizza</Table.Cell>
											<Table.Cell>20</Table.Cell>
											<Table.Cell>$4999.99</Table.Cell>
										</Table.Row>
									</Table.Body>
									<Table.Footer>
										<Table.Row>
											<Table.HeaderCell />
											<Table.HeaderCell>Total</Table.HeaderCell>
											<Table.HeaderCell>$9999.00</Table.HeaderCell>
										</Table.Row>
									</Table.Footer>
									<Table.Footer>
										<Table.Row>
											<Table.HeaderCell />
											<Table.HeaderCell>Delivery charges</Table.HeaderCell>
											<Table.HeaderCell>$9999.00</Table.HeaderCell>
										</Table.Row>
									</Table.Footer>
								</Table>
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
					<Header as="h3">Confirm your order</Header>
					<Segment.Group horizontal style={{ width: "89%" }}>
						<Segment style={{ padding: "2em 3em 2em 3em" }}>
							<Header as="h4">Insert Info:-</Header>
							<Form>
								<Form.Group widths="equal">
									<Form.Field required={true}>
										<label>First Name</label>
										<input placeholder="First Name" />
									</Form.Field>
									<Form.Field required={true}>
										<label>Last Name</label>
										<input placeholder="Last Name" />
									</Form.Field>
								</Form.Group>
								<Form.Field required={true}>
									<label>Address Line 1</label>
									<input placeholder="Address Line 1" />
								</Form.Field>
								<Form.Field>
									<label>Address Line 2</label>
									<input placeholder="Address Line 2" />
								</Form.Field>
								<Form.Group widths="equal">
									<Form.Field required={true}>
										<label>Country</label>
										<input placeholder="Country" />
									</Form.Field>
									<Form.Field required={true}>
										<label>City</label>
										<input placeholder="City" />
									</Form.Field>
									<Form.Field required={true}>
										<label>Postal Code</label>
										<input placeholder="Postal Code" />
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field required={true}>
										<label>Phone Number</label>
										<input placeholder="Phone Number" />
									</Form.Field>
									<Form.Field>
										<label>Other Phone Number</label>
										<input placeholder="Other Phone Number" />
									</Form.Field>
								</Form.Group>
								<Form.Field required={true}>
									<Checkbox label="I agree to the Terms and Conditions" />
								</Form.Field>
								<Button type="submit">Submit Order</Button>
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
									<Table.Row>
										<Table.Cell>Pepperoni Pizza</Table.Cell>
										<Table.Cell>20</Table.Cell>
										<Table.Cell>$4999.99</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Pepperoni Pizza</Table.Cell>
										<Table.Cell>20</Table.Cell>
										<Table.Cell>$4999.99</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Pepperoni Pizza</Table.Cell>
										<Table.Cell>20</Table.Cell>
										<Table.Cell>$4999.99</Table.Cell>
									</Table.Row>
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell />
										<Table.HeaderCell>Total</Table.HeaderCell>
										<Table.HeaderCell>$9999.00</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell />
										<Table.HeaderCell>Delivery charges</Table.HeaderCell>
										<Table.HeaderCell>$9999.00</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						</Segment>
					</Segment.Group>
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
