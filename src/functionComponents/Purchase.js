// Imports
import "./Purchase.css";
import { useState } from "react";
import { Button, Modal, Input } from "antd";
const { ethers } = require("ethers");

// Component that returns the JSX code to display the information relating to the purchase
function Purchase({ product }) {
  // As at 18/06/22 (16:32 BST), 1 USD is worth 0.001004 so the calculation we will use is price of item x 0.001004
  const priceOfETH = 0.001004;

  // Private key of MetaMask Rinkeby ETH wallet. If you need access to this key, please contact me at martinnolan_1@live.co.uk
  // Without this key, the products page will not load
  const PrivateKey = "---";

  // URL of application using infura.io as a provider to store the application data on the blockchain
  // Without this URL, the products page will not load
  const RpcHttpUrl = "---";
  const Provider = new ethers.getDefaultProvider(RpcHttpUrl);

  // Convert private key to hex to be used by ethers.js API
  const HexPrivateKey = new Buffer.from(PrivateKey, "hex");

  // Sign the transaction so that it can be securely sent on the blockchain
  const Signer = new ethers.Wallet(HexPrivateKey, Provider);

  // Transfer ETH
  async function transferEth() {
    // Get the time when confirm button clicked
    var today = new Date().toLocaleTimeString();

    setIsModalVisible(false);
    const productPriceInETH = (product.price * priceOfETH).toString();
    // Transfer ETH to store owner's wallet
    const transaction = await Signer.sendTransaction({
      to: "0x404541effdB6F481805B63bb8b451B5b457F1E64", // Store owners wallet address
      value: ethers.utils.parseEther(productPriceInETH), // eth amount to transfer (in wei)
    });

    // Get Block Number
    const blockNumber = await Provider.getBlockNumber();

    // Get Hash number
    const hashNumber = transaction.hash;

    // Get transaction details
    const fetchTransaction = async () => {
      const detailsArray = [];
      const transactionDetails = await Provider.getTransaction(hashNumber);
      const fromAddress = transactionDetails.from;
      const toAddress = transactionDetails.to;

      // Add transaction details to details array
      detailsArray.push(today, blockNumber, hashNumber, fromAddress, toAddress);

      // Write transaction details to a txt document and prompt this to be downloaded in the browser
      // This is used for testing and to gather data for conducting the study
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:attachment/text," + encodeURI(detailsArray);
      hiddenElement.target = "_blank";
      hiddenElement.download = "transactionDetailsInfura.txt";
      hiddenElement.click();
    };

    // Alert popup to confirm transaction has been successful
    if (transaction) {
      window.alert(
        "Transaction completed successfully. Check your Metamask wallet balance or view your receipt on rinkeby.etherscan.io using hash: " +
          hashNumber
      );
      // Run the fetchTransaction function after 40 seconds.
      // This timeout allows enough time for the transaction
      // to be processed on the blockchain before fetching the details
      setTimeout(fetchTransaction, 40000);
    }
  }

  // Get the state of the Modal and set it to visible if the button to buy is clicked
  // Set the delivery address entered by the user at checkout
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Display additional information about the product and allow the user to select
          purchase by clicking the Buy Now button. This button will only be displayed if the product
          the chainID of the MetaMask wallet matches "0x13881" which is the chainID for Mumbai Testnet.
          This stops users from sending cryptocurrency on a different network, which could cause them to 
          lose the funds indefinitely. */}
      <span className="price"> Price: ${product.price}</span>
      <p style={{ borderBottom: "1px solid #3f3f42" }}>No Additional Costs</p>
      <h1 style={{ color: "green", textAlign: "center" }}>In Stock</h1>

      <Button className="link" onClick={() => setIsModalVisible(true)}>
        Buy Now
      </Button>

      {/* Pop-up modal to display the transaction information and allow the user to
          confirm if they would like to complete the purchase. This also allows them to
          set the delivery address for the transaction. */}
      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={transferEth}
        onCancel={() => setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img
            src={product.image}
            alt="Product"
            style={{ width: "250px" }}
          ></img>
          <div>
            <h3>{product.name}</h3>
            <h2>${product.price}</h2>
            <h4>Delivery Address</h4>
            <Input
              className="deliveryAddress"
              //onChange={(value) => setDelivery(value.target.value)}
            ></Input>
            <h3 style={{ color: "red", marginTop: "20px" }}>Important!</h3>
            <p style={{ fontFamily: "Montserrat" }}>
              Only continue with this purchase if you are paying through the
              Rinkeby Test Network. After clicking OK, please allow up to 30
              seconds for purchase confirmation.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Purchase;
