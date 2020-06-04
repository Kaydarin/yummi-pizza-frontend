import React from "react";
import { Header, Icon, Segment, Button, Statistic } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";

export default function StepThree(props) {
	return (
		<Segment placeholder style={{ width: "89%" }}>
			<Header icon>
				<Icon name="like" />
				<Statistic>
					<Statistic.Label>Thank you!</Statistic.Label>
					<p style={{ marginTop: "20px" }}>Your order number is</p>
					<Statistic.Value>{props.orderNumber}</Statistic.Value>
				</Statistic>
				<p>
					You can track your order by check on the 'Orders' menu on the left.
				</p>
			</Header>
			<Segment.Inline>
				<Button primary as={Link} to="/orders">
					Orders
				</Button>
				<Button onClick={() => props.goToNextStep(0)}>Main Menu</Button>
			</Segment.Inline>
		</Segment>
	);
}
