import React, { Fragment } from "react";
import { Header, Table, Icon, Divider, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function OrderDetail(props) {
	return (
		<Fragment>
			<Divider
				horizontal
				style={{ marginTop: props.isFirst ? "0px" : "100px" }}
			>
				<Header as="h4">
					<Icon name="tag" />
					Order Number: {props.orderNo}
				</Header>
			</Divider>
			<Table definition style={{ margin: "30px 0 30px 0" }}>
				<Table.Body>
					<Table.Row>
						<Table.Cell width={4}>Order Status</Table.Cell>
						<Table.Cell>{props.orderStatus}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell width={4}>Name</Table.Cell>
						<Table.Cell>
							{props.firstName} {props.lastName}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Address</Table.Cell>
						<Table.Cell>
							{props.addressLine1}
							<br />
							{props.addressLine2 ? props.addressLine2 : ""}
							{props.addressLine2 ? <br /> : ""}
							{props.poscode + " " + props.city}
							<br />
							{props.country}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Phone Number</Table.Cell>
						<Table.Cell>{props.mainPhone}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Other Phone Number</Table.Cell>
						<Table.Cell>
							{props.otherPhone ? (
								props.otherPhone
							) : (
								<Label size="tiny">Not Set</Label>
							)}
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</Fragment>
	);
}
