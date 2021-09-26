import {
  Heading,
  Flex,
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import abi from "../utils/ContractABI.json";
import { ethers } from "ethers";
import { useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import Head from "next/head";

const contractAddress = "0xf876C6e08B310AaCcd77E54AC2EeF944B842bDBc";

export default function Home() {
  const toast = useToast();

  const [inTxn, setInTxn] = useState(false);
  const [mintVal, setMintVal] = useState(0.001);

  const safeMint = async () => {
    if (mintVal >= 0.001) {
      setInTxn(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const myNFTContract = new ethers.Contract(contractAddress, abi, signer);

      let mintValInHex = ethers.utils.parseEther(`${mintVal}`, "ether");
      console.log(mintValInHex._hex);

      const mint = await myNFTContract.safeMint(
        window.ethereum.selectedAddress,
        {
          value: mintValInHex,
        }
      );
      await mint.wait();
      toast({
        duration: 3000,
        title: "Transaction Completed!",
      });
      console.log(mint);
      setInTxn(false);
    } else {
      toast({
        duration: 3000,
        title: "Input value less than minimum",
      });
    }
  };

  return (
    <Box padding={4} minW="100%">
      <Head>
        <title>$DAK Drop</title>
      </Head>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={28} m={4}>
          A Limited edition ERC 721 Token by{" "}
          <Link href="https://twitter.com/dawksh">Daksh</Link>
        </Text>
        <InputGroup m={5}>
          <Input
            type="text"
            onChange={(e) => setMintVal(e.target.value)}
            placeholder="Min 0.001 ETH"
            minimum={0.001}
          />
          <InputRightAddon children={"ETH"} />
        </InputGroup>

        {inTxn ? (
          <Button isLoading />
        ) : (
          <Button onClick={safeMint}>Get it now!</Button>
        )}
      </Flex>
    </Box>
  );
}
