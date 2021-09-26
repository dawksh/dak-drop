import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

function Header({ bal, address, loadAcc }) {
	let addressDisplay;
	if (address) {
		let addArr = address.split("");
		addressDisplay =
			addArr[0] +
			addArr[1] +
			addArr[2] +
			addArr[3] +
			"..." +
			addArr[addArr.length - 4] +
			addArr[addArr.length - 3] +
			addArr[addArr.length - 2] +
			addArr[addArr.length - 1];
	}

	return (
		<Flex direction="row" p={4} justifyContent="space-between">
			<Flex direction={"row"}>
				<Heading
					bgClip="text"
					backgroundImage="url('/images/gradient.webp')"
					backgroundSize="cover"
					mx={2}
					fontWeight="900"
				>
					$DAK
				</Heading>
				<Heading>Drop</Heading>
			</Flex>

			<Flex>
				{bal && address ? (
					<>
						<Box
							backgroundColor={"whiteAlpha.700"}
							p={2}
							marginRight={1}
							rounded={"md"}
						>
							{" "}
							{parseFloat(bal).toFixed(4)}
						</Box>
						<Box
							backgroundColor={"whiteAlpha.700"}
							p={2}
							rounded={"md"}
						>
							{" "}
							{addressDisplay}
						</Box>
					</>
				) : (
					<Box
						backgroundColor={"whiteAlpha.700"}
						p={2}
						rounded={"md"}
					>
						<Button onClick={loadAcc} size={"sm"}>
							Connect
						</Button>
					</Box>
				)}
			</Flex>
		</Flex>
	);
}

export default Header;
