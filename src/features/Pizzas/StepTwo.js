import React, { Fragment } from "react";
import { Header, Segment, Button, Checkbox, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CartTable from "../../components/CartTable";

export default function StepTwo(props) {
	return (
		<Fragment>
			<Header as="h3">Confirm your order</Header>
			<Segment.Group horizontal style={{ width: "89%" }}>
				<Segment style={{ padding: "2em 3em 2em 3em" }}>
					<Header as="h4">Insert Info:-</Header>
					<Form>
						<Form.Group widths="equal">
							<Form.Field required={true} error={props.isErrorFirstName}>
								<label>First Name</label>
								<input
									placeholder="First Name"
									value={props.firstName}
									onChange={e => props.handleInputChange("firstName", e)}
								/>
							</Form.Field>
							<Form.Field required={true} error={props.isErrorLastName}>
								<label>Last Name</label>
								<input
									placeholder="Last Name"
									value={props.lastName}
									onChange={e => props.handleInputChange("lastName", e)}
								/>
							</Form.Field>
						</Form.Group>
						<Form.Field required={true} error={props.isErrorAddressLine1}>
							<label>Address Line 1</label>
							<input
								placeholder="Address Line 1"
								value={props.addressLine1}
								onChange={e => props.handleInputChange("addressLine1", e)}
							/>
						</Form.Field>
						<Form.Field>
							<label>Address Line 2</label>
							<input
								placeholder="Address Line 2"
								value={props.addressLine2}
								onChange={e => props.handleInputChange("addressLine2", e)}
							/>
						</Form.Field>
						<Form.Group widths="equal">
							<Form.Field required={true} error={props.isErrorCountry}>
								<label>Country</label>
								<input
									placeholder="Country"
									value={props.country}
									onChange={e => props.handleInputChange("country", e)}
								/>
							</Form.Field>
							<Form.Field required={true} error={props.isErrorCity}>
								<label>City</label>
								<input
									placeholder="City"
									value={props.city}
									onChange={e => props.handleInputChange("city", e)}
								/>
							</Form.Field>
							<Form.Field required={true} error={props.isErrorPoscode}>
								<label>Postal Code</label>
								<input
									placeholder="Postal Code"
									value={props.poscode}
									onChange={e => props.handleInputChange("poscode", e)}
								/>
							</Form.Field>
						</Form.Group>
						<Form.Group widths="equal">
							<Form.Field required={true} error={props.isErrorMainPhone}>
								<label>Phone Number</label>
								<input
									placeholder="Phone Number"
									value={props.mainPhone}
									onChange={e => props.handleInputChange("mainPhone", e)}
								/>
							</Form.Field>
							<Form.Field>
								<label>Other Phone Number</label>
								<input
									placeholder="Other Phone Number"
									value={props.otherPhone}
									onChange={e => props.handleInputChange("otherPhone", e)}
								/>
							</Form.Field>
						</Form.Group>
						<Form.Field required={true}>
							<Checkbox label="I agree to the Terms and Conditions" />
						</Form.Field>
						<Button.Group widths={2}>
							<Button positive onClick={props.handleSubmitOrder}>
								Submit Order
							</Button>
							<Button.Or />
							<Button negative onClick={() => props.goToNextStep(0)}>
								Go Back
							</Button>
						</Button.Group>
					</Form>
				</Segment>
				<Segment style={{ padding: "2em 3em 2em 3em" }}>
					<Header as="h4">Your Order:-</Header>
					<CartTable
						pizzas={props.pizza}
						currency={props.currency}
						isPizzaPriceCalculateIndividually={false}
						totalPrice={props.renderTotalPrice()}
						deliveryCharge={props.deliveryCharge}
					/>
				</Segment>
			</Segment.Group>
		</Fragment>
	);
}
