import React, {useState, useEffect} from "react";
import {
    Box,
    Button,
    Text,
    Spinner
} from "@chakra-ui/react";
import { useAccountContext } from "./contexts/Account";
import useContractReader from "./hooks/useContractReader";
import useContractWriter from "./hooks/useContractWriter";
import greeterABI from "./abis/Greeter.json";

const c = {
    '1': 'Ethereum',
    '3': 'Ropsten',
    '4': 'Rinkeby',
    '5': 'Goerli',
    '31337': 'Hardhat',
}

/**
 * chain名称
 * @param {number} chainId
 * @returns {string}
 */
function GetChainName(chainId) {
    return c[chainId];
}


function App() {
    const {account, chainId, connect, signer, provider, disconnect } = useAccountContext();
    const [greeting, setGreeting] = useState("");
    const [isLoading, setLoading] = useState(false);
    console.log("chainId", chainId);
    console.log("account", account);
    const greeterContractReader = useContractReader(greeterABI.abi, "0x8Aa11da91efBE39973F8FC0668e5E2689a35f4C0");
    const greeterContractWriter = useContractWriter(greeterABI.abi, "0x8Aa11da91efBE39973F8FC0668e5E2689a35f4C0");
    const callSetGreeting = async () => {
        setLoading(true);
        let txRes = await greeterContractWriter.setGreeting("some message");
        await txRes.wait();
        setLoading(false);
    }
    const callGreet = async () => {
        setGreeting(await greeterContractReader.greet());
    }
    
    return (
        <Box pl="5px" pt="5px">
            <Box>
                <Button colorScheme="blue" onClick={connect}>connect</Button>
                <Button colorScheme="yellow" onClick={disconnect}>disconnect</Button>
            </Box>
            <Text>{`account: ${account}`}</Text>
            <Text>{`chainId: ${chainId}`}</Text>
            <Text>{`network: ${GetChainName(chainId)}`}</Text>
            <Box>
                <Button colorScheme="blue" onClick={callSetGreeting}>callSetGreeting</Button>
                <Button colorScheme="yellow" onClick={callGreet}>callGreet</Button>
            </Box>
            <Text>{`Greeting: ${greeting}`}</Text>
            {isLoading ? <Spinner /> : null}
        </Box>
    );
}

export default App;
