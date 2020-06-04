import React from "react";
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { round } from "mathjs";

const renderTotalPrice = (price, ordercount) => {
	const totalPrice = round(price * ordercount, 2).toFixed(2);

	if (totalPrice > 0) {
		return totalPrice;
	} else {
		return 0;
	}
};

export default function CartTable(props) {
	return (
		<Table basic="very">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Pizza(s)</Table.HeaderCell>
					<Table.HeaderCell>Quantity</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{props.pizzas.map(pizza => {
					if (pizza.ordercount > 0) {
						return (
							<Table.Row>
								<Table.Cell>{pizza.name}</Table.Cell>
								<Table.Cell>{pizza.ordercount}</Table.Cell>
								<Table.Cell>
									{pizza.currency === "USD" ? "$" : "&"}
									{props.isPizzaPriceCalculateIndividually
										? renderTotalPrice(pizza.price, pizza.ordercount)
										: parseFloat(
												round(pizza.price * pizza.ordercount, 2).toFixed(2)
										  )}
								</Table.Cell>
							</Table.Row>
						);
					} else if (pizza.pizzacount > 0) {
						return (
							<Table.Row>
								<Table.Cell>{pizza.name}</Table.Cell>
								<Table.Cell>{pizza.pizzacount}</Table.Cell>
								<Table.Cell>
									{pizza.currency === "USD" ? "$" : "&"}
									{props.isPizzaPriceCalculateIndividually
										? renderTotalPrice(pizza.price, pizza.pizzacount)
										: parseFloat(
												round(pizza.price * pizza.pizzacount, 2).toFixed(2)
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
						{props.currency === "USD" ? "$" : "&"}
						{props.totalPrice}
					</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell />
					<Table.HeaderCell>Delivery charges</Table.HeaderCell>
					<Table.HeaderCell>
						{props.currency === "USD" ? "$" : "&"}
						{props.deliveryCharge}
					</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
		</Table>
	);
}
