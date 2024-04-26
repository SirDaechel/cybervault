import { exchangeRates } from "@/constants";

const generateRandomHexString = (length: number) => {
  const hexChars = "0123456789abcdef";
  let hexString = "";
  for (let i = 0; i < length; i++) {
    hexString += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return hexString;
};

export const generateDummyPrivateKey = () => {
  // Generate a 64-character hex string
  return generateRandomHexString(64);
};

export const deriveDummyPublicKey = (privateKey: string) => {
  // Generate a public key by reversing the private key and taking the first 64 characters
  return privateKey.split("").reverse().join("").substring(0, 64);
};

export const createDummyAddress = (publicKey: string, crypto: string) => {
  // Generate address by taking the first 40 characters of the reversed public key
  return (
    "cb0" +
    "-" +
    crypto +
    publicKey.split("").reverse().join("").substring(0, 40)
  );
};

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

export const sumInvestments = (array: Balance[]) => {
  return array.reduce((total, item) => {
    // Ensure that the investment property is a number before adding it to the total
    return typeof item.investment === "number"
      ? total + item.investment
      : total;
  }, 0);
};

// Function to get the exchange rate
export const getExchangeRate = (fromCurrency: string, toCurrency: string) => {
  return exchangeRates[fromCurrency][toCurrency] || null;
};

// Function to swap currencies
export const swapCurrencies = (
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  const rate = getExchangeRate(fromCurrency, toCurrency);
  if (rate === null) {
    return null;
  }
  const exchangedAmount = amount * rate;
  return exchangedAmount;
};
