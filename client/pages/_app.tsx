import type { AppProps } from "next/app";
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	split,
	HttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import * as ws from "ws";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/registerForm.css";
import "../styles/homeLeftPanel.css";
import "../styles/chatText.css";

import store from "../redux/store";

// setup: https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024

const wsLink = process.browser
	? new WebSocketLink({
			uri: "ws://localhost:5000/graphql",
			options: {
				reconnect: true,
			},
	  })
	: null;

const httpLink = new HttpLink({
	uri: "http://localhost:5000/graphql",
	credentials: "same-origin",
});

const link = process.browser
	? split(
			//only create the split in the browser
			// split based on operation type
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink,
			httpLink
	  )
	: httpLink;

const client = new ApolloClient({
	link: httpLink,
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</Provider>
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
