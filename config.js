
module.exports = {
    datadir : '/Users/username/Library/Ethereum',  // The datadir path of the Ethereum 
    fromAddr : '0x50ce3d591446bd26c470a79ed9e150d0bb9e84e1',  // Ethereum address which hold the Wancoin
    passphrase : '******',  // The passphrase for the Ethereum keystore of the above address
    chainId : 0x03, // 0x01 - Wanchain Mainnet,  0x03 - Wanchain Testnet
    toAddr : '0xcAb6aD272D18A52ECd8fc1F37398AbA675145990',  // Wanchain address, make sure have the correct Wanchain keystore for this address
    sendAmount : 1*1e18, // 1 Wan. Don't send all the wancoin, need to keep about 0.005 Wan as the tx fee
    gasPrice : 200*1e9, // 200 GWin
	gasLimit : 47000
}