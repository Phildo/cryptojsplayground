const bip39 = require('bip39')
const bip32 = require('bip32')
const ethpkta = require('ethereum-public-key-to-address')
const readline = require('readline')
const secrets = require('./secrets')

var seed = bip39.mnemonicToSeedSync(secrets.mnemonic, secrets.pass);
var root = bip32.fromSeed(seed);
var node = root.derivePath("m/44'/60'/0'/0/0");
var address = ethpkta(node.publicKey);
console.log(address);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var done = false;
var prev = "";
var mod = 0;
var attempt = function(pass)
{
  if(done) return;
  if(!mod)
  {
    console.log("attempting "+prev+"..."+pass+"...");
    prev = pass;
  }
  mod++;
  if(mod > 100) mod = 0;

  var seed = bip39.mnemonicToSeedSync(secrets.mnemonic, pass);
  var root = bip32.fromSeed(seed);
  var node = root.derivePath("m/44'/60'/0'/0/0");
  var address = ethpkta(node.publicKey);
  for(var i = 0; i < 10; i++)
    if(address[i] != secrets.target[i]) return;
  done = true;
  console.log(pass);
  console.log(address);
  console.log(secrets.target);
}

rl.on('line',attempt);

