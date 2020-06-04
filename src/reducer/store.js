export default {
	stateKey: "stateValue",
	userInfo: {
		firstName: "",
		lastName: "",
		addressLine1: "",
		addressLine2: "",
		country: "",
		city: "",
		poscode: "",
		mainPhone: "",
		otherPhone: ""
	},
	currency: "USD",
	deliveryCharge: 15.0,
	pizza: [
		{
			id: 1,
			name: "Pepperoni Usuals",
			price: 9.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 2,
			name: "Macaroni Loveronii",
			price: 18.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 3,
			name: "Hawaiian Stuff",
			price: 23.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 4,
			name: "Chika Chick",
			price: 12.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 5,
			name: "Beat the Meat",
			price: 16.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 6,
			name: "Veggie Diet",
			price: 8.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 7,
			name: "Seafood Sensation",
			price: 27.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 8,
			name: "PrawnXFish",
			price: 30.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		},
		{
			id: 9,
			name: "Tuna Muna",
			price: 15.99,
			description: "Some nice toppings included.",
			img: "",
			orderCount: 0
		}
	],
	orderHistory: [],
	pizzaOrders: [
		{
			orderNo: 101,
			currency: "USD",
			deliveryCharge: 30.0,
			status: "deliver",
			userOrdersInfo: {
				firstName: "John",
				lastName: "Doe",
				addressLine1: "Hamburg Road 1",
				addressLine2: "Hamburg Road 2",
				country: "Germany",
				city: "Hamburg",
				poscode: "880002",
				mainPhone: "012345678",
				otherPhone: "0123456789"
			},
			pizza: [
				{
					id: 1,
					name: "Pepperoni Usuals",
					price: 9.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 2
				},
				{
					id: 2,
					name: "Macaroni Loveronii",
					price: 18.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 1
				}
			]
		},
		{
			orderNo: 102,
			currency: "USD",
			deliveryCharge: 30.0,
			status: "bake",
			userOrdersInfo: {
				firstName: "John",
				lastName: "Doe",
				addressLine1: "Hamburg Road 1",
				addressLine2: "Hamburg Road 2",
				country: "Germany",
				city: "Hamburg",
				poscode: "880002",
				mainPhone: "012345678",
				otherPhone: "0123456789"
			},
			pizza: [
				{
					id: 6,
					name: "Veggie Diet",
					price: 8.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 3
				},
				{
					id: 7,
					name: "Seafood Sensation",
					price: 27.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 2
				}
			]
		},
		{
			orderNo: 103,
			currency: "USD",
			deliveryCharge: 30.0,
			status: "complete",
			userOrdersInfo: {
				firstName: "John",
				lastName: "Doe",
				addressLine1: "Hamburg Road 1",
				addressLine2: "Hamburg Road 2",
				country: "Germany",
				city: "Hamburg",
				poscode: "880002",
				mainPhone: "012345678",
				otherPhone: "0123456789"
			},
			pizza: [
				{
					id: 6,
					name: "Veggie Diet",
					price: 8.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 4
				},
				{
					id: 7,
					name: "Seafood Sensation",
					price: 27.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 10
				},
				{
					id: 8,
					name: "PrawnXFish",
					price: 30.99,
					description: "Some nice toppings included.",
					img: "",
					orderCount: 12
				}
			]
		}
	]
};
