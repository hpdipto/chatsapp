import type { AppProps } from "next/app";
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/registerForm.css";

import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
