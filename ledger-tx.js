
const ethTx = require('ethereumjs-tx');
const ethUtil = require('ethereumjs-util');
const wanUtil = require('wanchain-util');
var RLP = require('rlp');
const Eth = require('@ledgerhq/hw-app-eth').default;
const Transport = require('@ledgerhq/hw-transport-node-hid').default;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const config = require('./config');

//const wanBipPath = "44'/5718350'/0'/0";
const ethBipPath = "44'/60'/0'/0";  //0xBf03e40968eeB092E5CeD4d2434352fAb64D8643

const getEthAddress = async () => {
    const transport =  await Transport.create();
    const eth = new Eth(transport);

    const result = await eth.getAddress(ethBipPath);
    return result;
};

getEthAddress().then(
	a => console.log(a.address)
    //a => console.log(wanUtil.toChecksumAddress(a.address))
);

//Compose the transaction raw and feed to sign and send
function composePersonalDataToSign () {
    const fromAddr = address= config.fromAddr;
    const transactionCount = web3.eth.getTransactionCount(config.fromAddr);

    //txtype, nonce, gasPrice, gasLimit, to, value, data, chainId, 0, 0
    argsList = [1, transactionCount, config.gasPrice, config.gasLimit, 
                config.toAddr, config.sendAmount, 0, 
                config.chainId, 0, 0];
    argsBufferList = [];

    for (var i = 0; i < argsList.length; i++) { 
        argHex = web3.toHex(argsList[i])
        if (argsList[i] != 0) {
            argsBufferList.push (ethUtil.toBuffer(argHex))
        } else {
            argsBufferList.push (ethUtil.toBuffer())
        }
    }

    console.log(argsBufferList);

    const encodedData = RLP.encode(argsBufferList);

    console.log(encodedData);

    return encodedData;
}

//The message will be be added a prefix by Ethereum - "Ethereum Signed Message:"
function signPersonalWithKeystore(encodedData){
    web3.personal.sign(encodedData, '0xbf03e40968eeb092e5ced4d2434352fab64d8643', 'password', function(err, result){
        if (err){
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

function signRawTxWithPrivateKey(){
    rawData = {
        Txtype : 0x01,
        nonce : 0,
        gasPrice : config.gasPrice,
        gasLimit : config.gasLimit,
        to : config.toAddr,
        value : config.sendAmount,
        data : '',
        chainId : config.chainId
    }; 

    let tx = new wanUtil.wanchainTx(rawData);
    tx.sign(new Buffer('b03b9e37ee8933dd00b19f528059d3340178f75ec992a28363d28e84408c83df', 'hex'));

    let serializedTx = tx.serialize();
    let signedRawData = '0x' + serializedTx.toString('hex');

    console.log('WAN signed raw data: ' + signedRawData);

    return signedRawData;
}

//The message will be be added a prefix by Ethereum - "Ethereum Signed Message:"
const signRawTxDataByLedger = async (encodedData) => {
  const transport =  await Transport.create();
  const eth = new Eth(transport);

  const result = await eth.signPersonalMessage("44'/60'/0'/0", encodedData);

  return result;
};

signRawTxDataByLedger(encodedData).then(result => {
    console.log(result);
    //console.log("Signature 0x" + result['r'] + result['s'] + v)
})

