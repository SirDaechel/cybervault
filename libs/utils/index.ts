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
  // Generate a public key by reversing the private key and taking the first 64 characters
  return privateKey.split("").reverse().join("").substring(0, 64);
}

function createDummyAddress(publicKey: string) {
  // Generate address by taking the first 40 characters of the reversed public key
  return "0x" + publicKey.split("").reverse().join("").substring(0, 40);
}

export const generateSeedPhrase = (wordCount = 12) => {
  const wordlist = [
    "abstract",
    "cart",
    "acoustic",
    "address",
    "ceiling",
    "alarm",
    "album",
    "perfume",
    "alert",
    "alien",
    "alleged",
    "allow",
    "almost",
    "shirt",
    "alpha",
    "already",
    "also",
    "bed",
    "always",
    "amateur",
    "amazing",
    "among",
    "film",
    "ancient",
    "anger",
    "angle",
    "angry",
    "animal",
    "ankle",
    "indigo",
    "annual",
    "another",
    "curtain",
    "antenna",
    "bank",
    "seal",
  ];

  let seedPhrase = [];
  for (let i = 0; i < wordCount; i++) {
    // Select a random word from the wordlist
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    seedPhrase.push(wordlist[randomIndex]);
  }

  return seedPhrase.join(" ");
};

// Copy text tp clipboard
export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
