function generateRandomHexString(length: number) {
  const hexChars = "0123456789abcdef";
  let hexString = "";
  for (let i = 0; i < length; i++) {
    hexString += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return hexString;
}

function generateDummyPrivateKey() {
  // Generate a 64-character hex string to simulate a 256-bit private key
  return generateRandomHexString(64);
}

function deriveDummyPublicKey(privateKey: string) {
  // Simulate deriving a public key by reversing the private key and taking the first 64 characters
  return privateKey.split("").reverse().join("").substring(0, 64);
}

function createDummyAddress(publicKey: string) {
  // Simulate creating an address by taking the first 40 characters of the reversed public key
  return "0x" + publicKey.split("").reverse().join("").substring(0, 40);
}

function generateSeedPhrase(wordCount = 12) {
  // Example wordlist. In practice, use a BIP39 wordlist for actual wallets.
  const wordlist = [
    "abstract",
    "accident",
    "acoustic",
    "address",
    "advance",
    "alarm",
    "album",
    "alcohol",
    "alert",
    "alien",
    "alleged",
    "allow",
    "almost",
    "alone",
    "alpha",
    "already",
    "also",
    "alter",
    "always",
    "amateur",
    "amazing",
    "among",
    "amount",
    "ancient",
    "anger",
    "angle",
    "angry",
    "animal",
    "ankle",
    "announce",
    "annual",
    "another",
    "answer",
    "antenna",
    "bank",
    "seal",
    // ... (add more words to match the BIP39 wordlist length)
  ];

  let seedPhrase = [];
  for (let i = 0; i < wordCount; i++) {
    // Select a random word from the wordlist
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    seedPhrase.push(wordlist[randomIndex]);
  }

  return seedPhrase.join(" ");
}
