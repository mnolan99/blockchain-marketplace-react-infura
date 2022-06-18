# BlockShop - Masters Project - Infura

### A Web3 blockchain marketplace test application that allows users to purchase items using test cryptocurrency on the Rinkeby Test Network through Metamask and Infura.io.

## Dependencies

- npm install antd - 4.18.7
- npm install dotenv - 8.2.0
- npm install ethers - 5.0.8
- npm install express - 4.15.2
- npm install infura-web3-provider - 0.0.3
- npm install lodash - 4.17.15
- npm install moment - 2.25.3
- npm install moment-timezone - 0.5.28
- npm install numeral - 2.0.6
- npm install react - 18.1.0
- npm install react-dom - 18.1.0
- npm install react-router-dom - 6.3.0
- npm install react-scripts - 4.0.3
- npm install styled-components - 5.3.5
- npm install truffle - 5.0.5
- npm install web-vitals - 2.1.4

## Installation

1. Download Metamask chrome extension from the ([Chrome Web Store ](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en))
2. Create an Infura account and set up a test server on Metamask chrome extension from the ([Infura.io](Infura.io))
3. Clone the repo
   ```sh
   git clone https://github.com/mnolan99/blockchain-marketplace-react-infura.git
   ```
4. Install Dependencies
   ```sh
   npm install ...
   ```
5. Enter your Metamask Rinkeby Test Network private key and Infura endpoints URL in `Purchase.js`

   ```js
   const PrivateKey = "---";
   const RpcHttpUrl = "---";
   ```

6. Run the application
   `npm start`

7. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Built With

- [React.js](https://reactjs.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Infura API](https://docs.infura.io/infura)

## Contact

Martin Nolan - B00419772@studentmail.uws.ac.uk or martinnolan_1@live.co.uk
