import React, { createContext, useState } from "react";

export const Web3Context = createContext([]);

export function Web3Provider({ children }) {
	const [web3, setWeb3] = useState(null);
	return (
		<Web3Context.Provider value={[web3, setWeb3]}>
			{children}
		</Web3Context.Provider>
	);
}
