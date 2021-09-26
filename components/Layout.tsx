import { useState, useEffect, useContext } from "react";
// @ts-ignore
import { walletContext } from "../utils/walletContext";
import { Web3Context } from "../utils/web3Context";
import Web3 from "web3";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import { useToast } from "@chakra-ui/toast";

function Layout({ children }) {

declare const window: Window &
   typeof globalThis & {
     FB: any
   }
}

  const toast = useToast();
  // https://mainnet.infura.io/v3/7fcc1bbd7e3b48b8b3c757bcf243eb98
  // https://ropsten.infura.io/v3/7fcc1bbd7e3b48b8b3c757bcf243eb98
  // for development: use ganache personal blockchain (http://127.0.0.1:7545)
  let web3 = new Web3(
    "https://rinkeby.infura.io/v3/7fcc1bbd7e3b48b8b3c757bcf243eb98"
  );
  let windowType: any;

  // app states
  const [accountAddress, setAccountAddress] = useState(undefined);
  const [accountBalance, setAccountBalance] = useState(undefined);

  const [walletState, setWalletState] = useContext(walletContext);
  const [web3Instance, setWeb3Instance] = useContext(Web3Context);

  async function loadAccounts() {
    let accounts = await windowType.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccountAddress(accounts[0]);
    let bal = await web3.eth.getBalance(accounts[0]);
    let ethBal: any = await web3.utils.fromWei(bal, "ether");
    setAccountBalance(ethBal);
    setWalletState({
      address: accounts[0],
      bal: ethBal,
    });
    setWeb3Instance(web3);
    if (window.ethereum.networkVersion != "4") {
      toast({
        duration: 5000,
        title: "Switch To Rinkeby Testnet",
      });
    }
  }

  useEffect(() => {
    windowType = window;

    if (windowType.ethereum !== undefined) {
      loadAccounts();
    } else {
      console.log("Install Metamask :)");
    }
  }, []);

  return (
    <>
      <Header
        bal={accountBalance}
        address={accountAddress}
        loadAcc={loadAccounts}
      />
      <br />
      <Flex>{children}</Flex>
      <br />
    </>
  );
}

export default Layout;
