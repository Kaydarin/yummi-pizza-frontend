import React, { Component, Fragment } from "react";
import {
	Header,
	Grid,
	Input,
	Select,
	Button,
	Segment,
	Card,
	Table
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./search-order.css";

class SearchOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allPizzaOrders: [],
			selectedCurrency: "",
			selectedDeliveryCharge: "",
			selectedOrderNo: "",
			selectedOrderStatus: "",
			selectedPizza: [],
			selectedUserInfo: {
				firstName: "",
				lastName: "",
				addressLine1: "",
				addressLine2: "",
				country: "",
				city: "",
				poscode: "",
				mainPhone: "",
				otherPhone: ""
			}
		};
	}

	renderLoop = () => {
		const tags = [];

		for (var i = 1; i <= 50; i++) {
			tags.push(<p>test {i}</p>);
		}

		return tags;
	};

	render() {
		const options = [
			{ key: "orderno", text: "Order Number", value: "orderno" },
			{ key: "phoneno", text: "Phone Number", value: "phoneno" }
		];

		return (
			<Fragment>
				<Header as="h3">Search your order</Header>
				<Grid columns="equal">
					<Grid.Column>
						<Input type="text" placeholder="Search..." action>
							<Select
								compact
								options={options}
								defaultValue="orderno"
								style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
							/>
							<input
								className="inputText"
								style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
							/>
							<Button type="submit">Search</Button>
						</Input>
						<Segment
							basic
							style={{
								overflow: "auto",
								height: "75vh",
								maxHeight: "75vh"
							}}
							loading={false}
						>
							<Card fluid href="#card-example-link-card">
								<Card.Content header="Order No.: 123" />
								<Card.Content>
									<Card.Meta>Total Price: $9999.99</Card.Meta>
									<Card.Description>Status: Delivering...</Card.Description>
								</Card.Content>
							</Card>
							<Card fluid href="#card-example-link-card">
								<Card.Content header="Order No.: 123" />
								<Card.Content>
									<Card.Meta>Total Price: $9999.99</Card.Meta>
									<Card.Description>Status: Delivering...</Card.Description>
								</Card.Content>
							</Card>
							<Card fluid href="#card-example-link-card">
								<Card.Content header="Order No.: 123" />
								<Card.Content>
									<Card.Meta>Total Price: $9999.99</Card.Meta>
									<Card.Description>Status: Delivering...</Card.Description>
								</Card.Content>
							</Card>
							<Card fluid href="#card-example-link-card">
								<Card.Content header="Order No.: 123" />
								<Card.Content>
									<Card.Meta>Total Price: $9999.99</Card.Meta>
									<Card.Description>Status: Delivering...</Card.Description>
								</Card.Content>
							</Card>
							{/* {this.renderLoop()} */}
						</Segment>
					</Grid.Column>
					<Grid.Column width={11}>
						<Segment
							style={{
								width: "82%",
								padding: "2em 3em 2em 3em"
							}}
							loading={false}
						>
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
										<Table.Cell>10</Table.Cell>
										<Table.Cell>$9999.99</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Pepperoni Pizza</Table.Cell>
										<Table.Cell>10</Table.Cell>
										<Table.Cell>$9999.99</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Pepperoni Pizza</Table.Cell>
										<Table.Cell>10</Table.Cell>
										<Table.Cell>$9999.99</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Pepperoni Pizza</Table.Cell>
										<Table.Cell>10</Table.Cell>
										<Table.Cell>$9999.99</Table.Cell>
									</Table.Row>
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell />
										<Table.HeaderCell>Total</Table.HeaderCell>
										<Table.HeaderCell>$99.99</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell />
										<Table.HeaderCell>Delivery charges</Table.HeaderCell>
										<Table.HeaderCell>$99.99</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						</Segment>
					</Grid.Column>
				</Grid>
			</Fragment>
		);
	}
}

export default SearchOrder;
