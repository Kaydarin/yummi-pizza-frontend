import React, { Component, Fragment } from "react";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function Pizza(props) {
	return (
		<Card color={props.orderCount === 0 ? "" : "brown"}>
			<Image src={props.img} wrapped ui={false} />
			<Card.Content>
				<Card.Header>
					{props.name}
					<Label
						attached="top right"
						active={true}
						size="large"
						circular
						style={{
							display: props.orderCount === 0 ? "none" : "block",
							top: "6px",
							right: "6px"
						}}
					>
						x{props.orderCount}
					</Label>
				</Card.Header>
				<Card.Meta>
					<span className="date">
						{props.currency === "USD" ? "$" : "&"}
						{props.price}
					</span>
				</Card.Meta>
				<Card.Description>{props.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className="ui two buttons">
					<Button basic color="green" onClick={() => props.addOrder(props.id)}>
						Add
					</Button>
					<Button basic color="red" onClick={() => props.removeOrder(props.id)}>
						Remove
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
}
