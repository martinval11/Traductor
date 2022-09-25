import '../styles/globals.css';
import '../styles/translator.scss';
import '../styles/darkmode.scss';
import '../styles/nav.scss';

import { NextUIProvider } from '@nextui-org/react';
const MyApp = ({ Component, pageProps }) => {

	return (
		// 2. Use at the root of your app
		<NextUIProvider>
			<Component {...pageProps} />
		</NextUIProvider>
	);
};

export default MyApp;
