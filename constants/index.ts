// Dummy crypto currencies and values
export const cryptocurrencies = [
  { name: "Bitcoin", symbol: "BTC", value: 62000 },
  { name: "Ethereum", symbol: "ETH", value: 3800 },
  { name: "Solana", symbol: "SOL", value: 195 },
  { name: "Cardano", symbol: "ADA", value: 0.7 },
];

// Dummy exchange rates
export const exchangeRates: ExchangeRates = {
  BTC: { ADA: 1.5, ETH: 0.025, SOL: 0.075 },
  ADA: { BTC: 0.666, ETH: 0.0167, SOL: 0.05 },
  ETH: { BTC: 40, ADA: 60, SOL: 3 },
  SOL: { BTC: 13.33, ADA: 20, ETH: 0.333 },
};
