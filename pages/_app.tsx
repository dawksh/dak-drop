import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3Provider } from "../utils/web3Context";
import { WalletProvider } from "../utils/walletContext";
import Layout from "../components/Layout";
import "@fontsource/inter";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
	fonts: {
		heading: "Inter",
		body: "Inter",
	},
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	styles: {
		global: (props) => ({
			body: {
				color: mode("gray.800", "whiteAlpha.900")(props),
				bg: mode("gray.100", "#141214")(props),
			},
		}),
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<Web3Provider>
			<WalletProvider>
				<ChakraProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</WalletProvider>
		</Web3Provider>
	);
}

export default MyApp;
