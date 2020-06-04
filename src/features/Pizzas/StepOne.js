import React, { Fragment } from "react";
import { Header, Segment, Grid, Button } from "semantic-ui-react";
import Pizza from "./Pizza";
import CartTable from "../../components/CartTable";
import "semantic-ui-css/semantic.min.css";

export default function StepOne(props) {
	return (
		<Fragment>
			<Grid columns={2}>
				<Grid.Column width={10}>
					<Grid columns={2} divided>
						<Grid.Row>
							<Grid.Column width={15}>
								<Header as="h3">Select your pizzas</Header>
								<Grid
									container
									columns={3}
									as={Segment}
									basic
									loading={props.isPizzaLoading}
									style={{
										minHeight: "80vh"
									}}
								>
									{props.pizza.map(pizza => (
										<Grid.Column>
											<Pizza
												id={pizza.id}
												name={pizza.name}
												price={pizza.price}
												currency={props.currency}
												description={pizza.description}
												img={pizza.img}
												addOrder={props.addOrder}
												removeOrder={props.removeOrder}
												orderCount={pizza.ordercount}
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
						<CartTable
							pizzas={props.pizza}
							currency={props.currency}
							isPizzaPriceCalculateIndividually={false}
							totalPrice={props.renderTotalPrice()}
							deliveryCharge={props.deliveryCharge}
						/>
						<Grid columns="equal">
							<Grid.Column>
								<Button
									content="Clear"
									style={{ marginRight: "5%", width: "80%" }}
									onClick={props.clearOrder}
								/>
							</Grid.Column>
							<Grid.Column>
								<Button
									content="Next"
									icon="right arrow"
									labelPosition="right"
									floated="right"
									style={{ marginRight: "5%", width: "80%" }}
									disabled={!props.isPizzaSelected}
									onClick={() => props.goToNextStep(1)}
								/>
							</Grid.Column>
						</Grid>
					</div>
				</Grid.Column>
			</Grid>
		</Fragment>
	);
}
