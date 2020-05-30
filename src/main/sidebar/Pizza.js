import React, { Component, Fragment } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./sidebar-menu.css";

export default function Pizza() {
	return (
		<Card>
			<Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
			<Card.Content>
				<Card.Header>Pepperoni Pizza</Card.Header>
				<Card.Meta>
					<span className="date">A very nice pizza.</span>
				</Card.Meta>
				<Card.Description>Some toppings here.</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className="ui two buttons">
					<Button basic color="green">
						Add
					</Button>
					<Button basic color="red">
						Remove
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
