type UserData = {
  privateKey: string;
  publicKey: string;
  passcode: string;
  seedPhrase: string;
  addresses: object;
  balances: object;
};

type Balance = {
  crypto: string;
  value: number;
  symbol: string;
  investment: number;
};

type Address = {
  [key: string]: string;
};

type ExchangeRates = {
  [key: string]: {
    [key: string]: number;
  };
};
