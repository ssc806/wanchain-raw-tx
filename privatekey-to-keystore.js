
const keythereum = require('keythereum');
const Wallet = require('ethereumjs-wallet');
const fs = require('fs');

function privatekeyToKeystore(privatekey){
	const key = new Buffer(privatekey, 'hex');
	const wallet = Wallet.fromPrivateKey(key);
	const keystore = wallet.toV3String('password');
	const address = wallet.getAddress().toString('hex')

	console.log('The address is: 0x'+ address)

    fs.writeFile('./keystore/' + address, keystore, function(err){
    	if (err){
    		return console.log(err)
    	} else {
    		console.log('The new keystore stored at ./keystore/' + address)
    	}

    })

	return keystore
}

/*
function keystoreToPrivatekey(address){
	const keyObject = keythereum.importFromFile(address, '.');
	//Buffer
	const privateKey = keythereum.recover('password', keyObject);

	console.log('Private key is: ' + privateKey.toString('hex'));

    //Without the prefix "0x"
	return privateKey;
}


//Test
const keystore = privatekeyToKeystore('b03b9e37ee8933dd00b19f528059d3340178f75ec992a28363d28e84408c83df');
console.log(keystore);

const privatekey = keystoreToPrivatekey('bf03e40968eeb092e5ced4d2434352fab64d8643').toString('hex');
console.log(privatekey);
*/

if (process.argv.length != 3) {
	console.log('Usage: node private-to-keystore <privatekey>');
    process.exit(1);
} else {
	privatekeyToKeystore(process.argv[2]);
}



