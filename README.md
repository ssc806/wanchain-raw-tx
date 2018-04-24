# Introduction

As we know, Wancoin is not a ERC20 token, it needs to be kept in the Wanchain Wallet.

But if you happened to send the Wancoin to an Ethereum account, you can use this script to pull the Wancoin to a correct Wanchain account.
Before use this script, you need to use the Wanchain Wallet to create a valid Wanchain account.

# How to Use

### 1. Lauch gwan locally
>gwan --rpc --rpcapi=web3,eth,personal --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "127.0.0.1" 

### 2.Fill the correct information in the config.js

### 3. Execute the script

> npm install

> npm index.js

# For Ledger user
### 1.Using the following tool to export the private from the Ledger, make sure input the correct derive path

https://github.com/iancoleman/bip39

### 2.Using the script privatekey-to-keystore.js to generate an Ethereum keystore

### 3.Put the keystore in the datadir in config.js
OR
### 3.Convert the Ethereum to a Wanchain keystore
