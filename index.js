
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const keythereum = require('keythereum');
const wanUtil = require('wanchain-util');

const config = require('./config');

//Get private key from the keystore
function getPrivatekeyByKeystore(){
	const datadir = config.datadir;
	const address= config.fromAddr;
	const passphrase = config.passphrase;

	var keyObject = keythereum.importFromFile(address, datadir);
	//Buffer
	var privateKey = keythereum.recover(passphrase, keyObject);

	console.log('Private key is: ' + privateKey.toString('hex'));

	return privateKey;
}


//Compose the transaction raw and feed to sign and send
function composeRawData () {
    const fromAddr = address= config.fromAddr;
	const transactionCount = web3.eth.getTransactionCount(config.fromAddr);

	rawData = {
		Txtype : 0x01,
		nonce : transactionCount,
		gasPrice : config.gasPrice,
		gasLimit : config.gasLimit,
		to : config.toAddr,
		value : config.sendAmount,
		data : '',
		chainId : config.chainId
    }; 

    console.log('rawData is:')
    console.log(rawData);

	return rawData;
}

function signAndSerializeRawData(rawData, privateKey){
    let tx = new wanUtil.wanchainTx(rawData);
    tx.sign(privateKey);

    let serializedTx = tx.serialize();
    let signedRawData = '0x' + serializedTx.toString('hex');

    console.log('WAN signed raw data: ' + signedRawData);

    return signedRawData;
}

function main() {
	console.log('From address is: ' + config.fromAddr);
    console.log ('WAN checksum address is: ' + wanUtil.toChecksumAddress(config.fromAddr.toString('hex')));

	rawData = composeRawData ();
	privateKey = getPrivatekeyByKeystore();

    signedRawData = signAndSerializeRawData(rawData, privateKey);

    web3.eth.sendRawTransaction(signedRawData, function(err, hash) {
	    if (!err) {
	        console.log('WAN transaction hash: ', hash); 
	    } else {
	    	console.log(err);
	    }
    });
}

main()











