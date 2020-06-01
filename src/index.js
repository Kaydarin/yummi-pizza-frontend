import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { initialState } from "./reducer/store";
import "./index.css";
import App from "./main/App";
import SidebarMenu from "./main/sidebar/SidebarMenu";
import * as serviceWorker from "./main/serviceWorker";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<React.StrictMode>
		{/* <App /> */}
		<Provider store={store}>
			<SidebarMenu />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
