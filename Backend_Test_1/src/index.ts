import { Alchemy, BigNumber, Network, AlchemyConfig } from "alchemy-sdk";
import EthDater from "ethereum-block-by-date";
import { ethers } from "ethers";
import 'dotenv/config'
import axios from "axios";

interface IBalanceResponse {
	jsonrpc: string;
	id: string;
	result: string;
}

const ERC721_ADDRESS = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const ETH_MAINNET_RPC = process.env.ETH_MAINNET_RPC!;
const CHUNK_REQUEST = 200;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

/**
 * Get ETH balance of all holders
 * @param timestamp (seconds)
 * @returns ETH value
 */
export async function getETHBalance(timestamp: number): Promise<string> {

	const ALCHEMY_CONFIG = {
		apiKey: ALCHEMY_API_KEY,
		network: Network.ETH_MAINNET,
		maxRetries: 10,
		batchRequests: true,
	}
	const alchemy = new Alchemy(ALCHEMY_CONFIG);

	// get holder of BAYC contract
	const holders = await alchemy.nft.getOwnersForContract(ERC721_ADDRESS);

	//  Get block at timestamp
	const provider: any = new ethers.JsonRpcProvider(ETH_MAINNET_RPC);
	const dater = new EthDater(provider);
	const blockAtTimestamp = await dater.getDate(timestamp * 1000, true, false);
	
	// create an array of requests to be sent
	const requests = holders.owners.map((holder: string) => {
		return {
			method: "eth_getBalance",
			params: [holder, `0x${blockAtTimestamp.block.toString(16)}`],
			id: 1,
			jsonrpc: "2.0",
		};
	});
	let index = 0;
	let ethBalance = BigNumber.from(0);

	// chunk requests to call rpc to get balance of each holder
	const batchRequestPromises = [];
	while (index < requests.length) {
		const batchRequests = requests.slice(index, index + CHUNK_REQUEST);
		batchRequestPromises.push(await axios.post(ETH_MAINNET_RPC, batchRequests));
		index += CHUNK_REQUEST;
	}

	const balanceResponses = await Promise.all(batchRequestPromises);
	
	for await (const balanceResponse of balanceResponses) {
		const balances = await balanceResponse.data;
		ethBalance = balances.reduce((ethValue: BigNumber, balance: IBalanceResponse) => {
			return ethValue.add(BigNumber.from(balance.result));
		}, ethBalance);
	}


	const result = ethers.formatUnits(ethBalance.toString(), 18);
	console.log(`Total ETH balances of holders: ${result} ETH`);

	return result;
}

getETHBalance(1719031179);
