const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoinjs = require('bitcoinjs-lib')
const bs58 = require('bs58')
const secrets = require('./secrets')

var seed = bip39.mnemonicToSeedSync(secrets.mnemonic+" "+secrets.pass);
var root = bip32.fromSeed(seed);
var node = root.derivePath("m/44'/60'/0'/0");
var payment = bitcoinjs.payments.p2pkh({pubkey:node.publicKey});
var address = payment.address;
console.log(bs58.decode(address).toString('hex'));

