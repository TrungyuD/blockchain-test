# Test: get total ETH balance of holder

1. Bored Ape Yacht Club (BAYC) is the current bluechip NFT project on Ethereum Blockchain.
  - Blockchain: Ethereum
  - Contract address: 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d
  - Website: https://boredapeyachtclub.com/#/

2. Create a program using node.js/Java to get the total ETH value in the crypto wallets of all holders at any time.

3. The program should take epoch time as the only input, and output the ETH value.


## Solution:

1. GET NFT Holders: We utilize Alchemy SDK to efficiently fetch the current NFT holders of the collection (BAYC)

2. Gather ETH Balances: Once the holders are identified, we request to ETH RPC to o retrieve their ETH balances at a specific input time. 

-> This solution is suitable for the current requirements of the problem.
However, sometimes in some case of real projects, we might apply a different approach. For example, building a monitoring and indexing system on blockchain.


## How to run 

- copy env
```bash
cp .env.example .env
```
- Replace or fill ALCHEMY_API_KEY value 

- Install dependencies
```bash
yarn install
```

- Run testcase:
```bash
yarn test
```

- Or call directly function
```bash
yarn dev
```

### Example
You can check ``src/index.ts`` or ``tests/test-1.test.ts``, input is ``1719031179`` and the result is ``108034.060408852591088889 ETH``