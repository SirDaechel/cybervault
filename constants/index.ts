// Dummy crypto currencies and values
export const cryptocurrencies = [
  { name: "Bitcoin", symbol: "BTC", value: 62000 },
  { name: "Ethereum", symbol: "ETH", value: 3800 },
  { name: "Solana", symbol: "SOL", value: 195 },
  { name: "Cardano", symbol: "ADA", value: 0.7 },
];

// Dummy exchange rates
export const exchangeRates: ExchangeRates = {
  BTC: {
    ADA: 62000 / 0.7, // Bitcoin to Cardano
    ETH: 62000 / 3800, // Bitcoin to Ethereum
    SOL: 62000 / 195, // Bitcoin to Solana
  },
  ADA: {
    BTC: 0.7 / 62000, // Cardano to Bitcoin
    ETH: 0.7 / 3800, // Cardano to Ethereum
    SOL: 0.7 / 195, // Cardano to Solana
  },
  ETH: {
    BTC: 3800 / 62000, // Ethereum to Bitcoin
    ADA: 3800 / 0.7, // Ethereum to Cardano
    SOL: 3800 / 195, // Ethereum to Solana
  },
  SOL: {
    BTC: 195 / 62000, // Solana to Bitcoin
    ADA: 195 / 0.7, // Solana to Cardano
    ETH: 195 / 3800, // Solana to Ethereum
  },
};
