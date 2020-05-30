import React from "react";
import {
	Header,
	Icon,
	Image,
	Menu,
	Segment,
	Sidebar,
	Grid,
	Button,
	Container
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./sidebar-menu.css";

class SidebarMenu extends React.Component {
	render() {
		return (
			<Sidebar.Pushable as={Segment} className="main">
				<Sidebar
					as={Menu}
					animation="push"
					icon="labeled"
					inverted
					vertical
					visible="visible"
					width="thin"
				>
					<Menu.Item as="a">
						<Icon name="chart pie" />
						Pizzas
					</Menu.Item>
					<Menu.Item as="a">
						<Icon name="clipboard list" />
						Orders
					</Menu.Item>
				</Sidebar>

				<Sidebar.Pusher>
					<Segment>
						<Header as="h2">Yummi Pizza</Header>
					</Segment>
					<Segment basic>
						<Header as="h3">Select your pizzas</Header>
						<Grid container columns={4}>
							<Grid.Column>
								<p>pizza 1</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 2</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 3</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 4</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 5</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 6</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 7</p>
							</Grid.Column>
							<Grid.Column>
								<p>pizza 8</p>
							</Grid.Column>
						</Grid>
					</Segment>
					<Container textAlign="right">
						<Button
							content="Next"
							icon="right arrow"
							labelPosition="right"
							style={{ marginRight: "5%" }}
						/>
					</Container>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}

export default SidebarMenu;
