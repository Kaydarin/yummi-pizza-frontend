import React, { Fragment } from "react";
import { Header, Table, Icon, Divider, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

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
	);
}
