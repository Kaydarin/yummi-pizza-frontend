import React from "react";
import { Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function OrderCard(props) {
	return (
		<Card fluid href="#card-example-link-card" onClick={props.viewOrder}>
			<Card.Content header={`Order No.: ${props.id}`} />
			<Card.Content>
				<Card.Meta>
					Total Price: {props.currency === "USD" ? "$" : "&"}
					{props.totalAmount}
				</Card.Meta>
				<Card.Description>Status: {props.status}</Card.Description>
			</Card.Content>
		</Card>
	);
}
