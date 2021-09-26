import { createContext, useState } from "react";

declare global {
	interface walletContext {
		address: any;
		bal: any;
	}
}

export const walletContext = createContext([]);

export function WalletProvider({ children }) {
	const [wallet, setWallet] = useState({
		bal: undefined,
		address: undefined,
	});

	return (
		<walletContext.Provider value={[wallet, setWallet]}>
			{children}
		</walletContext.Provider>
	);
}
