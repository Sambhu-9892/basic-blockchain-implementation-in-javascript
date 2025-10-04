const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key (replace with your own private key if you want)
const myKey = ec.keyFromPrivate('c2af9817b39770b98a95d180699b3e9702efbc898d475ae330a7a672aa390710');
const myWalletAddress = myKey.getPublic('hex');

// Create a new blockchain instance
let savjeeCoin = new Blockchain();

// Create a recipient wallet (just for demo purposes)
const recipientKey = ec.genKeyPair();
const recipientWalletAddress = recipientKey.getPublic('hex');

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, recipientWalletAddress, 10);
tx1.signTransaction(myKey);

// Add the transaction to the blockchain
savjeeCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);

// Display balances
console.log('\nBalance of my wallet is', savjeeCoin.getBalanceOfAddress(myWalletAddress));
console.log('Balance of recipient wallet is', savjeeCoin.getBalanceOfAddress(recipientWalletAddress));

// Try mining again to get mining rewards from previous block
console.log('\n Starting the miner again...');
savjeeCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of my wallet after mining again is', savjeeCoin.getBalanceOfAddress(myWalletAddress));
